import { Inject, Injectable } from '@nestjs/common'
import { AuthenticationError, UserInputError } from 'apollo-server-errors'
import {
  UserJourney,
  UserJourneyRole,
  UserTeamRole
} from '.prisma/api-journeys-client'
import { v4 as uuidv4 } from 'uuid'
import { PrismaService } from '../../lib/prisma.service'
import { JourneyService } from '../journey/journey.service'
import { IdType, Journey } from '../../__generated__/graphql'

@Injectable()
export class UserJourneyService {
  @Inject(PrismaService) private readonly prismaService: PrismaService
  @Inject(JourneyService)
  private readonly journeyService: JourneyService

  async requestAccess(
    journeyId: string,
    idType: IdType,
    userId: string
  ): Promise<UserJourney | undefined> {
    const journey =
      idType === IdType.slug
        ? await this.journeyService.getBySlug(journeyId)
        : await this.prismaService.journey.findUnique({
            where: { id: journeyId }
          })

    if (journey == null) throw new UserInputError('journey does not exist')

    const existingUserJourney = await this.prismaService.userJourney.findUnique(
      {
        where: { journeyId_userId: { journeyId, userId } }
      }
    )

    // Return existing access request or do nothing if user has access
    if (existingUserJourney != null) {
      return existingUserJourney.role === UserJourneyRole.inviteRequested
        ? existingUserJourney
        : undefined
    }

    return await this.prismaService.userJourney.create({
      data: {
        id: uuidv4(),
        userId,
        journeyId: journey.id,
        role: UserJourneyRole.inviteRequested
      }
    })
  }

  async approveAccess(id: string, userId: string): Promise<UserJourney | null> {
    const userJourney = await this.prismaService.userJourney.findUnique({
      where: { id }
    })

    if (userJourney == null)
      throw new UserInputError('userJourney does not exist')

    const actor = await this.prismaService.userJourney.findUnique({
      where: { journeyId_userId: { journeyId: id, userId } }
    })

    if (actor?.role === UserJourneyRole.inviteRequested)
      throw new AuthenticationError(
        'You do not have permission to approve access'
      )

    const journey = await this.prismaService.journey.findUnique({
      where: { id: userJourney.journeyId }
    })

    if (journey == null) throw new UserInputError('journey does not exist')

    if (journey.teamId != null) {
      await this.prismaService.userTeam.upsert({
        where: {
          teamId_userId: {
            userId: requesterUserId,
            teamId: journey.teamId
          }
        },
        update: {},
        create: {
          userId: requesterUserId,
          teamId: journey.teamId,
          role: UserTeamRole.guest
        }
      })
    }

    return await this.prismaService.userJourney.update({
      where: { id },
      data: { role: UserJourneyRole.editor }
    })
  }
}
