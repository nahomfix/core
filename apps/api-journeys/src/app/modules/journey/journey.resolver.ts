import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent
} from '@nestjs/graphql'
import { CurrentUserId } from '@core/nest/decorators/CurrentUserId'
import slugify from 'slugify'
import { UseGuards } from '@nestjs/common'
import {
  getPowerBiEmbed,
  PowerBiEmbed
} from '@core/nest/powerBi/getPowerBiEmbed'
import { ForbiddenError, UserInputError } from 'apollo-server-errors'
import { GraphQLError } from 'graphql'
import { v4 as uuidv4 } from 'uuid'
import {
  Block,
  ChatButton,
  Host,
  Journey,
  UserJourney,
  UserJourneyRole,
  Prisma
} from '.prisma/api-journeys-client'
import { FromPostgresql } from '@core/nest/decorators/FromPostgresql'
import isEmpty from 'lodash/isEmpty'
import omit from 'lodash/omit'
import { CaslAbility, CaslAccessible } from '@core/nest/common/CaslAuthModule'
import { subject } from '@casl/ability'

import { BlockService } from '../block/block.service'
import {
  IdType,
  JourneyStatus,
  JourneysFilter,
  JourneyTemplateInput,
  JourneysReportType,
  JourneyCreateInput,
  JourneyUpdateInput
} from '../../__generated__/graphql'
import { PrismaService } from '../../lib/prisma.service'
import { AppCaslGuard } from '../../lib/casl/caslGuard'
import { Action, AppAbility } from '../../lib/casl/caslFactory'

export const ERROR_PSQL_UNIQUE_CONSTRAINT_VIOLATED = 'P2002'

@Resolver('Journey')
export class JourneyResolver {
  constructor(
    private readonly blockService: BlockService,
    private readonly prismaService: PrismaService
  ) {}

  @Query()
  async adminJourneysReport(
    @CurrentUserId() userId: string,
    @Args('reportType') reportType: JourneysReportType
  ): Promise<PowerBiEmbed> {
    let reportId: string | undefined
    switch (reportType) {
      case JourneysReportType.multipleFull:
        reportId = process.env.POWER_BI_JOURNEYS_MULTIPLE_FULL_REPORT_ID
        break
      case JourneysReportType.multipleSummary:
        reportId = process.env.POWER_BI_JOURNEYS_MULTIPLE_SUMMARY_REPORT_ID
        break
      case JourneysReportType.singleFull:
        reportId = process.env.POWER_BI_JOURNEYS_SINGLE_FULL_REPORT_ID
        break
      case JourneysReportType.singleSummary:
        reportId = process.env.POWER_BI_JOURNEYS_SINGLE_SUMMARY_REPORT_ID
        break
    }

    if (
      process.env.POWER_BI_CLIENT_ID == null ||
      process.env.POWER_BI_CLIENT_SECRET == null ||
      process.env.POWER_BI_TENANT_ID == null ||
      process.env.POWER_BI_WORKSPACE_ID == null ||
      reportId == null
    ) {
      throw new GraphQLError('server environment variables missing', {
        extensions: { code: 'INTERNAL_SERVER_ERROR' }
      })
    }

    const config = {
      clientId: process.env.POWER_BI_CLIENT_ID,
      clientSecret: process.env.POWER_BI_CLIENT_SECRET,
      tenantId: process.env.POWER_BI_TENANT_ID,
      workspaceId: process.env.POWER_BI_WORKSPACE_ID
    }

    try {
      return await getPowerBiEmbed(config, reportId, userId)
    } catch (err) {
      throw new GraphQLError(err.message, {
        extensions: { code: 'BAD_REQUEST' }
      })
    }
  }

  @Query()
  @UseGuards(AppCaslGuard)
  async adminJourneys(
    @CurrentUserId() userId: string,
    @CaslAccessible('Journey') accessibleJourneys: Prisma.JourneyWhereInput,
    @Args('status') status?: JourneyStatus[],
    @Args('template') template?: boolean,
    @Args('teamId') teamId?: string
  ): Promise<Journey[]> {
    const where: Prisma.JourneyWhereInput = {}
    if (teamId != null) {
      where.teamId = teamId
    } else if (template !== true) {
      // if not looking for templates then only return journeys where:
      //   1. the user is an owner or editor
      //   2. not a member of the team
      where.userJourneys = {
        some: {
          userId,
          role: { in: [UserJourneyRole.owner, UserJourneyRole.editor] }
        }
      }
      where.team = {
        userTeams: {
          none: {
            userId
          }
        }
      }
    }
    if (template != null) where.template = template
    if (status != null) where.status = { in: status }

    return await this.prismaService.journey.findMany({
      where: {
        AND: [accessibleJourneys, where]
      }
    })
  }

  @Query()
  @UseGuards(AppCaslGuard)
  async adminJourney(
    @CaslAbility() ability: AppAbility,
    @Args('id') id: string,
    @Args('idType') idType: IdType = IdType.slug
  ): Promise<Journey> {
    const where: Prisma.JourneyWhereUniqueInput =
      idType === IdType.slug ? { slug: id } : { id }

    const journey = await this.prismaService.journey.findUnique({
      where,
      include: {
        userJourneys: true,
        team: {
          include: { userTeams: true }
        }
      }
    })

    if (journey == null)
      throw new GraphQLError('journey not found', {
        extensions: { code: 'NOT_FOUND' }
      })
    if (ability.can(Action.Read, subject('Journey', journey))) return journey
    throw new ForbiddenError('user is not allowed to view journey')
  }

  @Query()
  async journeys(@Args('where') where?: JourneysFilter): Promise<Journey[]> {
    const filter: Prisma.JourneyWhereInput = { status: JourneyStatus.published }

    if (where?.template === true) filter.template = true
    if (where?.featured === true) filter.featuredAt = { not: null }

    return await this.prismaService.journey.findMany({
      where: filter
    })
  }

  @Query()
  async journey(
    @Args('id') id: string,
    @Args('idType') idType: IdType = IdType.slug
  ): Promise<Journey | null> {
    const where: Prisma.JourneyWhereUniqueInput =
      idType === IdType.slug ? { slug: id } : { id }

    const journey = await this.prismaService.journey.findUnique({
      where
    })

    if (journey == null)
      throw new GraphQLError('journey not found', {
        extensions: { code: 'NOT_FOUND' }
      })

    return journey
  }

  @Mutation()
  @UseGuards(AppCaslGuard)
  async journeyCreate(
    @CaslAbility() ability: AppAbility,
    @Args('input') input: JourneyCreateInput,
    @CurrentUserId() userId: string,
    // TODO: remove when teams is released
    @Args('teamId') teamId = 'jfp-team'
  ): Promise<Journey | undefined> {
    let retry = true
    let slug = slugify(input.slug ?? input.title, {
      lower: true,
      strict: true
    })
    const id = input.id ?? uuidv4()
    while (retry) {
      try {
        let journey: Journey | undefined
        await this.prismaService.$transaction(async (tx) => {
          await tx.journey.create({
            data: {
              ...omit(input, ['id', 'primaryImageBlockId', 'teamId', 'hostId']),
              title: input.title,
              languageId: input.languageId,
              id,
              slug,
              status: JourneyStatus.draft,
              team: { connect: { id: teamId } },
              userJourneys: {
                create: {
                  userId,
                  role: UserJourneyRole.owner
                }
              }
            }
          })
          journey =
            (await tx.journey.findUnique({
              where: { id },
              include: {
                userJourneys: true,
                team: {
                  include: { userTeams: true }
                }
              }
            })) ?? undefined
          if (journey == null)
            throw new GraphQLError('journey not found', {
              extensions: { code: 'NOT_FOUND' }
            })
          if (!ability.can(Action.Create, subject('Journey', journey)))
            throw new ForbiddenError('user is not allowed to create journey')
        })

        retry = false
        return journey
      } catch (err) {
        if (err.code === ERROR_PSQL_UNIQUE_CONSTRAINT_VIOLATED) {
          slug = slugify(`${slug}-${id}`)
        } else {
          retry = false
          throw err
        }
      }
    }
  }

  getFirstMissingNumber(@Args('arr') arr: number[]): number {
    // May contain duplicate numbers in array so can't use binary search
    arr.sort((a, b) => a - b)
    let duplicateNumber = 0
    arr.forEach((num, i) => {
      if (arr[i] === duplicateNumber) duplicateNumber++
    })
    return duplicateNumber
  }

  getJourneyDuplicateNumbers(
    @Args('journeys') journeys: Journey[],
    @Args('title') title: string
  ): number[] {
    return journeys.map((journey, i) => {
      if (journey.title === title) {
        return 0
      } else if (journey.title === `${title} copy`) {
        return 1
      } else {
        // Find the difference between duplicated journey and journey in list titles, remove the "copy" to find duplicate number
        const modifier = journey.title.split(title)[1]?.split(' copy')
        const duplicate = modifier[1]?.trim() ?? ''
        const numbers = duplicate.match(/^\d+$/)
        // If no duplicate number found, it's a unique journey. Return 0
        return numbers != null ? parseInt(numbers[0]) : 0
      }
    })
  }

  @Mutation()
  @UseGuards(AppCaslGuard)
  async journeyDuplicate(
    @CaslAbility() ability: AppAbility,
    @Args('id') id: string,
    @CurrentUserId() userId: string,
    // TODO: remove when teams is released
    @Args('teamId') teamId = 'jfp-team'
  ): Promise<Journey | undefined> {
    const journey = await this.prismaService.journey.findUnique({
      where: { id },
      include: {
        userJourneys: true,
        team: {
          include: { userTeams: true }
        }
      }
    })
    if (journey == null)
      throw new GraphQLError('journey not found', {
        extensions: { code: 'NOT_FOUND' }
      })
    if (ability.cannot(Action.Read, subject('Journey', journey)))
      throw new ForbiddenError('user is not allowed to duplicate journey')

    const duplicateJourneyId = uuidv4()
    const existingDuplicateJourneys = await this.prismaService.journey.findMany(
      {
        where: {
          title: {
            contains: journey.title
          }
        }
      }
    )
    const duplicates = this.getJourneyDuplicateNumbers(
      existingDuplicateJourneys,
      journey.title
    )
    const duplicateNumber = this.getFirstMissingNumber(duplicates)
    const duplicateTitle = `${journey.title}${
      duplicateNumber === 0
        ? ''
        : duplicateNumber === 1
        ? ' copy'
        : ` copy ${duplicateNumber}`
    }`.trimEnd()

    let slug = slugify(duplicateTitle, {
      lower: true,
      strict: true
    })

    const originalBlocks = await this.blockService.getBlocksByType(
      journey,
      'StepBlock'
    )
    const duplicateStepIds = new Map()
    originalBlocks.forEach((block) => {
      duplicateStepIds.set(block.id, uuidv4())
    })
    const duplicateBlocks = await this.blockService.getDuplicateChildren(
      originalBlocks,
      id,
      null,
      duplicateStepIds,
      duplicateJourneyId,
      duplicateStepIds
    )

    let duplicatePrimaryImageBlock
    if (journey.primaryImageBlockId != null) {
      const original = await this.prismaService.block.findUnique({
        where: { id: journey.primaryImageBlockId },
        include: { action: true }
      })
      if (original != null) {
        const id = uuidv4()
        duplicatePrimaryImageBlock = {
          ...omit(original, ['id', 'journeyId', 'action']),
          id
        }

        duplicateBlocks.push(duplicatePrimaryImageBlock)
      }
    }

    let retry = true
    while (retry) {
      try {
        let duplicateJourney: Journey | undefined
        await this.prismaService.$transaction(async (tx) => {
          await tx.journey.create({
            data: {
              ...omit(journey, [
                'primaryImageBlockId',
                'publishedAt',
                'hostId',
                'teamId'
              ]),
              id: duplicateJourneyId,
              slug,
              title: duplicateTitle,
              status: JourneyStatus.draft,
              template: false,
              team: { connect: { id: teamId } },
              userJourneys: {
                create: {
                  userId,
                  role: UserJourneyRole.owner,
                  openedAt: new Date()
                }
              }
            }
          })
          duplicateJourney =
            (await tx.journey.findUnique({ where: { id } })) ?? undefined
          if (journey == null)
            throw new GraphQLError('journey not found', {
              extensions: { code: 'NOT_FOUND' }
            })
          if (!ability.can(Action.Create, subject('Journey', journey)))
            throw new ForbiddenError('user is not allowed to duplicate journey')
        })
        // save base blocks
        await this.blockService.saveAll(
          duplicateBlocks.map((block) => ({
            ...omit(block, [
              'parentBlockId',
              'posterBlockId',
              'coverBlockId',
              'nextBlockId',
              'action'
            ]),
            typename: block.typename,
            journey: {
              connect: { id: duplicateJourneyId }
            }
          }))
        )
        // update block references after import
        for (const block of duplicateBlocks) {
          if (
            block.parentBlockId != null ||
            block.posterBlockId != null ||
            block.coverBlockId != null ||
            block.nextBlockId != null
          ) {
            await this.blockService.update(block.id, {
              parentBlockId: block.parentBlockId ?? undefined,
              posterBlockId: block.posterBlockId ?? undefined,
              coverBlockId: block.coverBlockId ?? undefined,
              nextBlockId: block.nextBlockId ?? undefined
            })
          }
          if (block.action != null && !isEmpty(block.action)) {
            await this.prismaService.action.create({
              data: {
                ...block.action,
                parentBlockId: block.id
              }
            })
          }
        }

        if (duplicatePrimaryImageBlock != null) {
          await this.prismaService.journey.update({
            where: { id: duplicateJourneyId },
            data: { primaryImageBlockId: duplicatePrimaryImageBlock.id }
          })
        }
        retry = false
        return duplicateJourney
      } catch (err) {
        if (err.code === ERROR_PSQL_UNIQUE_CONSTRAINT_VIOLATED) {
          slug = slugify(`${slug}-${duplicateJourneyId}`)
        } else {
          retry = false
          throw err
        }
      }
    }
  }

  @Mutation()
  @UseGuards(AppCaslGuard)
  async journeyUpdate(
    @CaslAbility() ability: AppAbility,
    @Args('id') id: string,
    @Args('input') input: JourneyUpdateInput
  ): Promise<Journey> {
    const journey = await this.prismaService.journey.findUnique({
      where: { id },
      include: {
        userJourneys: true,
        team: {
          include: { userTeams: true }
        }
      }
    })
    if (journey == null)
      throw new GraphQLError('journey not found', {
        extensions: { code: 'NOT_FOUND' }
      })
    if (ability.cannot(Action.Update, subject('Journey', journey)))
      throw new ForbiddenError('user is not allowed to update journey')
    if (input.slug != null)
      input.slug = slugify(input.slug, {
        lower: true,
        strict: true
      })
    if (input.hostId != null) {
      const host = await this.prismaService.host.findUnique({
        where: { id: input.hostId }
      })
      if (host == null)
        throw new GraphQLError('host not found', {
          extensions: { code: 'NOT_FOUND' }
        })
      if (host.teamId !== journey.teamId)
        throw new UserInputError(
          'the team id of host does not not match team id of journey'
        )
    }
    try {
      return await this.prismaService.journey.update({
        where: { id },
        data: {
          ...input,
          title: input.title ?? undefined,
          languageId: input.languageId ?? undefined,
          slug: input.slug ?? undefined
        }
      })
    } catch (err) {
      if (err.code === ERROR_PSQL_UNIQUE_CONSTRAINT_VIOLATED)
        throw new UserInputError('slug is not unique')
      throw err
    }
  }

  @Mutation()
  @UseGuards(AppCaslGuard)
  async journeyPublish(
    @CaslAbility() ability: AppAbility,
    @Args('id') id: string
  ): Promise<Journey> {
    const journey = await this.prismaService.journey.findUnique({
      where: { id }
    })
    if (journey == null)
      throw new GraphQLError('journey not found', {
        extensions: { code: 'NOT_FOUND' }
      })
    if (ability.cannot(Action.Manage, subject('Journey', journey)))
      throw new ForbiddenError('user is not allowed to publish journey')
    return await this.prismaService.journey.update({
      where: { id },
      data: {
        status: JourneyStatus.published,
        publishedAt: new Date()
      }
    })
  }

  @Mutation()
  @UseGuards(AppCaslGuard)
  async journeysArchive(
    @CaslAccessible(['Journey', Action.Manage])
    accessibleJourneys: Prisma.JourneyWhereInput,
    @Args('ids') ids: string[]
  ): Promise<Journey[]> {
    await this.prismaService.journey.updateMany({
      where: { AND: [accessibleJourneys, { id: { in: ids } }] },
      data: { status: JourneyStatus.archived, archivedAt: new Date() }
    })
    return await this.prismaService.journey.findMany({
      where: { AND: [accessibleJourneys, { id: { in: ids } }] }
    })
  }

  @Mutation()
  @UseGuards(AppCaslGuard)
  async journeysDelete(
    @CaslAccessible(['Journey', Action.Manage])
    accessibleJourneys: Prisma.JourneyWhereInput,
    @Args('ids') ids: string[]
  ): Promise<Journey[]> {
    await this.prismaService.journey.updateMany({
      where: { AND: [accessibleJourneys, { id: { in: ids } }] },
      data: { status: JourneyStatus.deleted, deletedAt: new Date() }
    })
    return await this.prismaService.journey.findMany({
      where: { AND: [accessibleJourneys, { id: { in: ids } }] }
    })
  }

  @Mutation()
  @UseGuards(AppCaslGuard)
  async journeysTrash(
    @CaslAccessible(['Journey', Action.Manage])
    accessibleJourneys: Prisma.JourneyWhereInput,
    @Args('ids') ids: string[]
  ): Promise<Journey[]> {
    await this.prismaService.journey.updateMany({
      where: { AND: [accessibleJourneys, { id: { in: ids } }] },
      data: { status: JourneyStatus.trashed, trashedAt: new Date() }
    })
    return await this.prismaService.journey.findMany({
      where: { AND: [accessibleJourneys, { id: { in: ids } }] }
    })
  }

  @Mutation()
  @UseGuards(AppCaslGuard)
  async journeysRestore(
    @CaslAccessible(['Journey', Action.Manage])
    accessibleJourneys: Prisma.JourneyWhereInput,
    @Args('ids') ids: string[]
  ): Promise<Journey[]> {
    const results = await this.prismaService.journey.findMany({
      where: { AND: [accessibleJourneys, { id: { in: ids } }] }
    })
    return await Promise.all(
      results.map((journey) =>
        this.prismaService.journey.update({
          where: { id: journey.id },
          data: {
            status:
              journey.publishedAt == null
                ? JourneyStatus.draft
                : JourneyStatus.published
          }
        })
      )
    )
  }

  @Mutation()
  @UseGuards(AppCaslGuard)
  async journeyTemplate(
    @CaslAbility() ability: AppAbility,
    @Args('id') id: string,
    @Args('input') input: JourneyTemplateInput
  ): Promise<Journey> {
    const journey = await this.prismaService.journey.findUnique({
      where: { id }
    })
    if (journey == null)
      throw new GraphQLError('journey not found', {
        extensions: { code: 'NOT_FOUND' }
      })
    if (ability.cannot(Action.Manage, subject('Journey', journey), 'template'))
      throw new ForbiddenError(
        'user is not allowed to change journey to or from a template'
      )
    return await this.prismaService.journey.update({
      where: { id },
      data: input
    })
  }

  @ResolveField()
  @FromPostgresql()
  async blocks(@Parent() journey: Journey): Promise<Block[]> {
    const where: Prisma.BlockWhereInput = { journeyId: journey.id }
    if (journey.primaryImageBlockId != null)
      where.id = { not: journey.primaryImageBlockId }
    return await this.prismaService.block.findMany({
      where,
      orderBy: { parentOrder: 'asc' },
      include: { action: true }
    })
  }

  @ResolveField()
  async chatButtons(@Parent() journey: Journey): Promise<ChatButton[]> {
    return await this.prismaService.chatButton.findMany({
      where: { journeyId: journey.id }
    })
  }

  @ResolveField()
  async host(@Parent() journey: Journey): Promise<Host | null> {
    if (journey.hostId == null) return null
    return await this.prismaService.host.findUnique({
      where: { id: journey.hostId }
    })
  }

  @ResolveField()
  async primaryImageBlock(@Parent() journey: Journey): Promise<Block | null> {
    if (journey.primaryImageBlockId == null) return null
    const block = await this.prismaService.block.findUnique({
      where: { id: journey.primaryImageBlockId },
      include: { action: true }
    })
    if (block?.journeyId !== journey.id) return null
    return block
  }

  @ResolveField()
  async userJourneys(@Parent() journey: Journey): Promise<UserJourney[]> {
    return await this.prismaService.userJourney.findMany({
      where: { journeyId: journey.id }
    })
  }

  @ResolveField('language')
  async language(
    @Parent() journey
  ): Promise<{ __typename: 'Language'; id: string }> {
    // 529 (english) is default if not set
    return { __typename: 'Language', id: journey.languageId ?? '529' }
  }
}
