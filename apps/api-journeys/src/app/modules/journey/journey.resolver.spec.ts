import { Test, TestingModule } from '@nestjs/testing'
import { v4 as uuidv4 } from 'uuid'
import { getPowerBiEmbed } from '@core/nest/powerBi/getPowerBiEmbed'
import {
  Journey,
  Prisma,
  UserTeamRole,
  Host,
  Block,
  UserJourney,
  ChatButton,
  ThemeMode,
  ThemeName,
  UserJourneyRole,
  Action
} from '.prisma/api-journeys-client'
import omit from 'lodash/omit'
import { CaslAuthModule } from '@core/nest/common/CaslAuthModule'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import {
  IdType,
  JourneysReportType,
  JourneyStatus
} from '../../__generated__/graphql'
import { BlockResolver } from '../block/block.resolver'
import { BlockService } from '../block/block.service'
import { UserRoleService } from '../userRole/userRole.service'
import { UserRoleResolver } from '../userRole/userRole.resolver'
import { PrismaService } from '../../lib/prisma.service'
import { AppAbility, AppCaslFactory } from '../../lib/casl/caslFactory'
import {
  ERROR_PSQL_UNIQUE_CONSTRAINT_VIOLATED,
  JourneyResolver
} from './journey.resolver'

jest.mock('uuid', () => ({
  __esModule: true,
  v4: jest.fn()
}))

const mockUuidv4 = uuidv4 as jest.MockedFunction<typeof uuidv4>

jest.mock('@core/nest/powerBi/getPowerBiEmbed', () => ({
  __esModule: true,
  getPowerBiEmbed: jest.fn()
}))

const mockGetPowerBiEmbed = getPowerBiEmbed as jest.MockedFunction<
  typeof getPowerBiEmbed
>

describe('JourneyResolver', () => {
  let resolver: JourneyResolver,
    blockService: DeepMockProxy<BlockService>,
    prismaService: DeepMockProxy<PrismaService>,
    ability: AppAbility

  const journey: Journey = {
    id: 'journeyId',
    slug: 'journey-slug',
    title: 'published',
    status: JourneyStatus.published,
    languageId: '529',
    themeMode: ThemeMode.light,
    themeName: ThemeName.base,
    description: null,
    primaryImageBlockId: null,
    teamId: 'teamId',
    publishedAt: new Date('2021-11-19T12:34:56.647Z'),
    createdAt: new Date('2021-11-19T12:34:56.647Z'),
    updatedAt: new Date('2021-11-19T12:34:56.647Z'),
    archivedAt: null,
    trashedAt: null,
    featuredAt: null,
    deletedAt: null,
    seoTitle: null,
    seoDescription: null,
    template: false,
    hostId: null
  }
  const journeyWithUserTeam = {
    ...journey,
    team: { userTeams: [{ userId: 'userId', role: UserTeamRole.manager }] }
  }
  const block: Block = {
    id: 'blockId',
    typename: 'ImageBlock',
    journeyId: 'journeyId',
    parentBlockId: null,
    parentOrder: null,
    label: null,
    variant: null,
    color: null,
    size: null,
    startIconId: null,
    endIconId: null,
    backgroundColor: null,
    coverBlockId: null,
    fullscreen: null,
    themeMode: null,
    themeName: null,
    spacing: null,
    direction: null,
    justifyContent: null,
    alignItems: null,
    xl: null,
    lg: null,
    sm: null,
    name: null,
    src: null,
    width: null,
    height: null,
    alt: null,
    blurhash: null,
    submitIconId: null,
    submitLabel: null,
    nextBlockId: null,
    locked: null,
    hint: null,
    minRows: null,
    content: null,
    align: null,
    startAt: null,
    endAt: null,
    muted: null,
    autoplay: null,
    posterBlockId: null,
    fullsize: null,
    videoId: null,
    videoVariantLanguageId: null,
    source: null,
    title: null,
    description: null,
    image: null,
    duration: null,
    objectFit: null,
    triggerStart: null,
    updatedAt: new Date()
  }
  const accessibleJourneys: Prisma.JourneyWhereInput = { OR: [{}] }
  beforeAll(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date(2020, 3, 1))
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CaslAuthModule.register(AppCaslFactory)],
      providers: [
        JourneyResolver,
        {
          provide: BlockService,
          useValue: mockDeep<BlockService>()
        },
        BlockResolver,
        UserRoleResolver,
        UserRoleService,
        {
          provide: PrismaService,
          useValue: mockDeep<PrismaService>()
        }
      ]
    }).compile()
    resolver = module.get<JourneyResolver>(JourneyResolver)
    blockService = module.get<BlockService>(
      BlockService
    ) as DeepMockProxy<BlockService>
    prismaService = module.get<PrismaService>(
      PrismaService
    ) as DeepMockProxy<PrismaService>
    ability = await new AppCaslFactory().createAbility({ id: 'userId' })
  })

  describe('adminJourneysReport', () => {
    it('should throw an error', async () => {
      jest.resetModules()
      const OLD_ENV = process.env
      process.env = {
        ...OLD_ENV,
        POWER_BI_JOURNEYS_MULTIPLE_FULL_REPORT_ID: undefined
      }

      await expect(
        resolver.adminJourneysReport('test id', JourneysReportType.multipleFull)
      ).rejects.toThrow('server environment variables missing')

      process.env = OLD_ENV
    })
    describe('with environment configuration', () => {
      const OLD_ENV = process.env
      beforeEach(() => {
        jest.resetModules() // Most important - it clears the cache
        process.env = { ...OLD_ENV } // Make a copy
        process.env.POWER_BI_CLIENT_ID = 'POWER_BI_CLIENT_ID'
        process.env.POWER_BI_CLIENT_SECRET = 'POWER_BI_CLIENT_SECRET'
        process.env.POWER_BI_TENANT_ID = 'POWER_BI_TENANT_ID'
        process.env.POWER_BI_WORKSPACE_ID = 'POWER_BI_WORKSPACE_ID'
        process.env.POWER_BI_JOURNEYS_MULTIPLE_FULL_REPORT_ID =
          'POWER_BI_JOURNEYS_MULTIPLE_FULL_REPORT_ID'
        process.env.POWER_BI_JOURNEYS_MULTIPLE_SUMMARY_REPORT_ID =
          'POWER_BI_JOURNEYS_MULTIPLE_SUMMARY_REPORT_ID'
        process.env.POWER_BI_JOURNEYS_SINGLE_FULL_REPORT_ID =
          'POWER_BI_JOURNEYS_SINGLE_FULL_REPORT_ID'
        process.env.POWER_BI_JOURNEYS_SINGLE_SUMMARY_REPORT_ID =
          'POWER_BI_JOURNEYS_SINGLE_SUMMARY_REPORT_ID'
      })
      afterAll(() => {
        process.env = OLD_ENV // Restore old environment
      })
      it('should get power bi embed for multiple full', async () => {
        mockGetPowerBiEmbed.mockResolvedValue({
          reportId: 'reportId',
          reportName: 'reportName',
          embedUrl: 'embedUrl',
          accessToken: 'accessToken',
          expiration: '2hrs'
        })
        await expect(
          resolver.adminJourneysReport(
            'userId',
            JourneysReportType.multipleFull
          )
        ).resolves.toEqual({
          reportId: 'reportId',
          reportName: 'reportName',
          embedUrl: 'embedUrl',
          accessToken: 'accessToken',
          expiration: '2hrs'
        })
        expect(mockGetPowerBiEmbed).toHaveBeenCalledWith(
          {
            clientId: 'POWER_BI_CLIENT_ID',
            clientSecret: 'POWER_BI_CLIENT_SECRET',
            tenantId: 'POWER_BI_TENANT_ID',
            workspaceId: 'POWER_BI_WORKSPACE_ID'
          },
          'POWER_BI_JOURNEYS_MULTIPLE_FULL_REPORT_ID',
          'userId'
        )
      })
      it('should get power bi embed for multiple summary', async () => {
        mockGetPowerBiEmbed.mockResolvedValue({
          reportId: 'reportId',
          reportName: 'reportName',
          embedUrl: 'embedUrl',
          accessToken: 'accessToken',
          expiration: '2hrs'
        })
        await expect(
          resolver.adminJourneysReport(
            'userId',
            JourneysReportType.multipleSummary
          )
        ).resolves.toEqual({
          reportId: 'reportId',
          reportName: 'reportName',
          embedUrl: 'embedUrl',
          accessToken: 'accessToken',
          expiration: '2hrs'
        })
        expect(mockGetPowerBiEmbed).toHaveBeenCalledWith(
          {
            clientId: 'POWER_BI_CLIENT_ID',
            clientSecret: 'POWER_BI_CLIENT_SECRET',
            tenantId: 'POWER_BI_TENANT_ID',
            workspaceId: 'POWER_BI_WORKSPACE_ID'
          },
          'POWER_BI_JOURNEYS_MULTIPLE_SUMMARY_REPORT_ID',
          'userId'
        )
      })
      it('should get power bi embed for single full', async () => {
        mockGetPowerBiEmbed.mockResolvedValue({
          reportId: 'reportId',
          reportName: 'reportName',
          embedUrl: 'embedUrl',
          accessToken: 'accessToken',
          expiration: '2hrs'
        })
        await expect(
          resolver.adminJourneysReport('userId', JourneysReportType.singleFull)
        ).resolves.toEqual({
          reportId: 'reportId',
          reportName: 'reportName',
          embedUrl: 'embedUrl',
          accessToken: 'accessToken',
          expiration: '2hrs'
        })
        expect(mockGetPowerBiEmbed).toHaveBeenCalledWith(
          {
            clientId: 'POWER_BI_CLIENT_ID',
            clientSecret: 'POWER_BI_CLIENT_SECRET',
            tenantId: 'POWER_BI_TENANT_ID',
            workspaceId: 'POWER_BI_WORKSPACE_ID'
          },
          'POWER_BI_JOURNEYS_SINGLE_FULL_REPORT_ID',
          'userId'
        )
      })
      it('should get power bi embed for single summary', async () => {
        mockGetPowerBiEmbed.mockResolvedValue({
          reportId: 'reportId',
          reportName: 'reportName',
          embedUrl: 'embedUrl',
          accessToken: 'accessToken',
          expiration: '2hrs'
        })
        await expect(
          resolver.adminJourneysReport(
            'userId',
            JourneysReportType.singleSummary
          )
        ).resolves.toEqual({
          reportId: 'reportId',
          reportName: 'reportName',
          embedUrl: 'embedUrl',
          accessToken: 'accessToken',
          expiration: '2hrs'
        })
        expect(mockGetPowerBiEmbed).toHaveBeenCalledWith(
          {
            clientId: 'POWER_BI_CLIENT_ID',
            clientSecret: 'POWER_BI_CLIENT_SECRET',
            tenantId: 'POWER_BI_TENANT_ID',
            workspaceId: 'POWER_BI_WORKSPACE_ID'
          },
          'POWER_BI_JOURNEYS_SINGLE_SUMMARY_REPORT_ID',
          'userId'
        )
      })
    })
  })
  describe('adminJourneys', () => {
    const journeysSharedWithMe: Prisma.JourneyWhereInput = {
      userJourneys: {
        some: {
          userId: 'userId',
          role: { in: [UserJourneyRole.owner, UserJourneyRole.editor] }
        }
      },
      team: {
        userTeams: {
          none: {
            userId: 'userId'
          }
        }
      }
    }
    beforeEach(() => {
      prismaService.journey.findMany.mockResolvedValueOnce([journey])
    })
    it('should get journeys that are shared with me', async () => {
      expect(
        await resolver.adminJourneys('userId', accessibleJourneys)
      ).toEqual([journey])
      expect(prismaService.journey.findMany).toHaveBeenCalledWith({
        where: {
          AND: [accessibleJourneys, journeysSharedWithMe]
        }
      })
    })
    it('should get filtered journeys', async () => {
      expect(
        await resolver.adminJourneys(
          'userId',
          accessibleJourneys,
          [JourneyStatus.archived],
          false,
          'teamId'
        )
      ).toEqual([journey])
      expect(prismaService.journey.findMany).toHaveBeenCalledWith({
        where: {
          AND: [
            accessibleJourneys,
            {
              status: { in: [JourneyStatus.archived] },
              template: false,
              teamId: 'teamId'
            }
          ]
        }
      })
    })
    describe('status', () => {
      it('should get journeys that are shared with me with status', async () => {
        expect(
          await resolver.adminJourneys('userId', accessibleJourneys, [
            JourneyStatus.draft
          ])
        ).toEqual([journey])
        expect(prismaService.journey.findMany).toHaveBeenCalledWith({
          where: {
            AND: [
              accessibleJourneys,
              { ...journeysSharedWithMe, status: { in: [JourneyStatus.draft] } }
            ]
          }
        })
      })
    })
    describe('template', () => {
      it('should get template journeys', async () => {
        expect(
          await resolver.adminJourneys(
            'userId',
            accessibleJourneys,
            undefined,
            true
          )
        ).toEqual([journey])
        expect(prismaService.journey.findMany).toHaveBeenCalledWith({
          where: {
            AND: [accessibleJourneys, { template: true }]
          }
        })
      })
    })
    describe('teamId', () => {
      it('should get journeys belonging to team', async () => {
        expect(
          await resolver.adminJourneys(
            'userId',
            accessibleJourneys,
            undefined,
            undefined,
            'teamId'
          )
        ).toEqual([journey])
        expect(prismaService.journey.findMany).toHaveBeenCalledWith({
          where: {
            AND: [accessibleJourneys, { teamId: 'teamId' }]
          }
        })
      })
    })
  })
  describe('adminJourney', () => {
    it('returns journey by slug', async () => {
      prismaService.journey.findUnique.mockResolvedValueOnce(
        journeyWithUserTeam
      )
      expect(
        await resolver.adminJourney(ability, 'journey-slug', IdType.slug)
      ).toEqual(journeyWithUserTeam)
      expect(prismaService.journey.findUnique).toHaveBeenCalledWith({
        where: { slug: 'journey-slug' },
        include: {
          userJourneys: true,
          team: {
            include: { userTeams: true }
          }
        }
      })
    })
    it('returns journey by id', async () => {
      prismaService.journey.findUnique.mockResolvedValueOnce(
        journeyWithUserTeam
      )
      expect(
        await resolver.adminJourney(ability, 'journeyId', IdType.databaseId)
      ).toEqual(journeyWithUserTeam)
      expect(prismaService.journey.findUnique).toHaveBeenCalledWith({
        where: { id: 'journeyId' },
        include: {
          userJourneys: true,
          team: {
            include: { userTeams: true }
          }
        }
      })
    })
    it('throws error if not found', async () => {
      prismaService.journey.findUnique.mockResolvedValueOnce(null)
      await expect(
        resolver.adminJourney(ability, 'journeyId', IdType.databaseId)
      ).rejects.toThrow('journey not found')
    })
    it('throws error if not authorized', async () => {
      prismaService.journey.findUnique.mockResolvedValueOnce(journey)
      await expect(
        resolver.adminJourney(ability, 'journeyId', IdType.databaseId)
      ).rejects.toThrow('user is not allowed to view journey')
    })
  })
  describe('journeys', () => {
    it('returns published journeys', async () => {
      prismaService.journey.findMany.mockResolvedValueOnce([journey, journey])
      expect(await resolver.journeys()).toEqual([journey, journey])
      expect(prismaService.journey.findMany).toHaveBeenCalledWith({
        where: {
          status: 'published'
        }
      })
    })
    it('returns published journeys where featuredAt', async () => {
      prismaService.journey.findMany.mockResolvedValueOnce([journey, journey])
      expect(await resolver.journeys({ featured: true })).toEqual([
        journey,
        journey
      ])
      expect(prismaService.journey.findMany).toHaveBeenCalledWith({
        where: {
          status: 'published',
          featuredAt: { not: null }
        }
      })
    })
    it('returns published journeys where template', async () => {
      prismaService.journey.findMany.mockResolvedValueOnce([journey, journey])
      expect(await resolver.journeys({ template: true })).toEqual([
        journey,
        journey
      ])
      expect(prismaService.journey.findMany).toHaveBeenCalledWith({
        where: {
          status: 'published',
          template: true
        }
      })
    })
  })
  describe('journey', () => {
    it('returns journey by slug', async () => {
      prismaService.journey.findUnique.mockResolvedValueOnce(journey)
      expect(await resolver.journey('journey-slug', IdType.slug)).toEqual(
        journey
      )
      expect(prismaService.journey.findUnique).toHaveBeenCalledWith({
        where: { slug: 'journey-slug' }
      })
    })
    it('returns journey by id', async () => {
      prismaService.journey.findUnique.mockResolvedValueOnce(journey)
      expect(await resolver.journey('journeyId', IdType.databaseId)).toEqual(
        journey
      )
      expect(prismaService.journey.findUnique).toHaveBeenCalledWith({
        where: { id: 'journeyId' }
      })
    })
    it('throws error if not found', async () => {
      prismaService.journey.findUnique.mockResolvedValueOnce(null)
      await expect(
        resolver.journey('unknownId', IdType.databaseId)
      ).rejects.toThrow('journey not found')
    })
  })
  describe('journeyCreate', () => {
    beforeEach(() => {
      prismaService.$transaction.mockImplementation(
        async (callback) => await callback(prismaService)
      )
    })
    it('creates a journey', async () => {
      prismaService.journey.create.mockResolvedValueOnce(journey)
      prismaService.journey.findUnique.mockResolvedValue(journeyWithUserTeam)
      mockUuidv4.mockReturnValueOnce('journeyId')
      expect(
        await resolver.journeyCreate(
          ability,
          { title: 'Untitled Journey', languageId: '529' },
          'userId',
          'teamId'
        )
      ).toEqual(journeyWithUserTeam)
      expect(prismaService.journey.create).toHaveBeenCalledWith({
        data: {
          id: 'journeyId',
          languageId: '529',
          slug: 'untitled-journey',
          status: 'draft',
          team: {
            connect: {
              id: 'teamId'
            }
          },
          title: 'Untitled Journey',
          userJourneys: {
            create: {
              role: 'owner',
              userId: 'userId'
            }
          }
        }
      })
    })

    it('adds uuid if slug already taken', async () => {
      prismaService.journey.create
        .mockRejectedValueOnce({
          code: ERROR_PSQL_UNIQUE_CONSTRAINT_VIOLATED
        })
        .mockResolvedValueOnce(journey)
      prismaService.journey.findUnique.mockResolvedValue(journeyWithUserTeam)
      expect(
        await resolver.journeyCreate(
          ability,
          {
            id: 'myJourneyId',
            title: 'Untitled Journey',
            slug: 'special-journey',
            languageId: '529'
          },
          'userId',
          'teamId'
        )
      ).toEqual(journeyWithUserTeam)
      expect(prismaService.journey.create).toHaveBeenCalledWith({
        data: {
          id: 'myJourneyId',
          languageId: '529',
          slug: 'special-journey-myJourneyId',
          status: 'draft',
          team: {
            connect: {
              id: 'teamId'
            }
          },
          title: 'Untitled Journey',
          userJourneys: {
            create: {
              role: 'owner',
              userId: 'userId'
            }
          }
        }
      })
    })

    it('throws error and does not get stuck in retry loop', async () => {
      prismaService.journey.create.mockRejectedValueOnce(
        new Error('database error')
      )
      await expect(
        resolver.journeyCreate(
          ability,
          { title: 'Untitled Journey', languageId: '529' },
          'userId',
          'teamId'
        )
      ).rejects.toThrow('database error')
    })
    it('throws error if not found', async () => {
      prismaService.journey.create.mockResolvedValueOnce(journey)
      prismaService.journey.findUnique.mockResolvedValue(null)
      await expect(
        resolver.journeyCreate(
          ability,
          { title: 'Untitled Journey', languageId: '529' },
          'userId',
          'teamId'
        )
      ).rejects.toThrow('journey not found')
    })
    it('throws error if not authorized', async () => {
      prismaService.journey.create.mockResolvedValueOnce(journey)
      prismaService.journey.findUnique.mockResolvedValue(journey)
      await expect(
        resolver.journeyCreate(
          ability,
          { title: 'Untitled Journey', languageId: '529' },
          'userId',
          'teamId'
        )
      ).rejects.toThrow('user is not allowed to create journey')
    })
  })
  describe('getFirstMissingNumber', () => {
    it('returns the first missing number in an unsorted number list', async () => {
      const array = [0, 1, 1, 2, 4, 5, 7, 8, 1, 0]
      const firstMissing = resolver.getFirstMissingNumber(array)
      expect(firstMissing).toEqual(3)
    })
    it('returns the next number in a sorted number list', async () => {
      const array = [0, 1, 1, 2, 3]
      const firstMissing = resolver.getFirstMissingNumber(array)
      expect(firstMissing).toEqual(4)
    })
  })
  describe('getJourneyDuplicateNumbers', () => {
    it('generates the duplicate number array from journeys', async () => {
      const array = [
        journey,
        {
          ...journey,
          title: `${journey.title} copy`
        },
        {
          ...journey,
          title: `${journey.title} copy 2`
        },
        // Unique journeys with same base title - returns 0
        {
          ...journey,
          title: `${journey.title} copy test`
        },
        {
          ...journey,
          title: `${journey.title} 3`
        },
        {
          ...journey,
          title: `${journey.title} copy-2a4bil`
        },
        // User edited journey copy number is recognised
        {
          ...journey,
          title: `${journey.title} copy 1`
        }
      ]
      const duplicateNumbers = resolver.getJourneyDuplicateNumbers(
        array,
        journey.title
      )
      expect(duplicateNumbers).toEqual([0, 1, 2, 0, 0, 0, 1])
      const arrayCopy = [
        {
          ...journey,
          title: `journey copy`
        },
        {
          ...journey,
          title: `journey copy 1`
        },
        {
          ...journey,
          title: `journey copy copy`
        },
        {
          ...journey,
          title: `journey copy copy 2`
        }
      ]
      const duplicateNumbersCopy = resolver.getJourneyDuplicateNumbers(
        arrayCopy,
        'journey copy'
      )
      expect(duplicateNumbersCopy).toEqual([0, 0, 1, 2])
    })
  })
  describe('journeyDuplicate', () => {
    const step: Block & { action: Action | null } = {
      ...block,
      id: 'stepId',
      journeyId: 'journeyId',
      typename: 'StepBlock',
      parentOrder: 0,
      action: null
    }
    const duplicatedStep = {
      ...step,
      journeyId: 'duplicateJourneyId',
      id: 'duplicateStepId'
    }

    const button: Block & { action: Action } = {
      ...block,
      id: 'buttonId',
      journeyId: 'journeyId',
      typename: 'ButtonBlock',
      action: {
        gtmEventName: null,
        journeyId: null,
        url: null,
        target: null,
        email: null,
        updatedAt: new Date(),
        parentBlockId: 'stepId',
        blockId: 'nextStepId'
      }
    }
    const duplicatedButton = {
      ...button,
      id: 'duplicateButtonId',
      journeyId: 'duplicateJourneyId',
      action: {
        ...button.action,
        blockId: 'duplicateNextStepId'
      }
    }
    const nextStep: Block & { action: Action | null } = {
      ...block,
      id: 'nextStepId',
      journeyId: 'journeyId',
      typename: 'StepBlock',
      parentOrder: 1,
      action: null
    }
    const duplicatedNextStep = {
      ...nextStep,
      id: 'duplicateNextStepId',
      journeyId: 'duplicateJourneyId'
    }
    const primaryImage = {
      ...block,
      typename: 'ImageBlock',
      id: 'primaryImageBlockId',
      parentOrder: 2,
      src: 'image.src',
      width: 100,
      height: 100,
      alt: 'primary-image-block',
      blurhash: 'image.blurhash'
    }
    const duplicatedPrimaryImage = {
      ...primaryImage,
      id: 'duplicatePrimaryImageId',
      journeyId: 'duplicateJourneyId'
    }
    beforeEach(() => {
      mockUuidv4.mockReturnValueOnce('duplicateJourneyId')
      prismaService.journey.findUnique
        // lookup existing journey to duplicate and authorize
        .mockResolvedValueOnce(journeyWithUserTeam)
        // lookup duplicate journey once created and authorize
        .mockResolvedValueOnce(journeyWithUserTeam)
      // find existing duplicate journeys
      prismaService.journey.findMany.mockResolvedValueOnce([journey])
      // find steps connected with existing journey
      prismaService.block.findMany.mockResolvedValueOnce([block])
      prismaService.$transaction.mockImplementation(
        async (callback) => await callback(prismaService)
      )
      blockService.getDuplicateChildren.mockResolvedValue([
        duplicatedStep,
        duplicatedButton,
        duplicatedNextStep
      ])
    })
    it('duplicates your journey', async () => {
      await resolver.journeyDuplicate(ability, 'journeyId', 'userId', 'teamId')
      expect(prismaService.journey.create).toHaveBeenCalledWith({
        data: {
          ...omit(journey, [
            'parentBlockId',
            'nextBlockId',
            'hostId',
            'primaryImageBlockId',
            'publishedAt',
            'teamId',
            'createdAt'
          ]),
          id: 'duplicateJourneyId',
          status: JourneyStatus.draft,
          slug: `${journey.title}-copy`,
          title: `${journey.title} copy`,
          template: false,
          team: {
            connect: { id: 'teamId' }
          },
          userJourneys: {
            create: {
              userId: 'userId',
              role: UserJourneyRole.owner
            }
          }
        }
      })
    })
    it('duplicates a template journey', async () => {
      prismaService.journey.findUnique
        .mockReset()
        // lookup existing journey to duplicate and authorize
        .mockResolvedValueOnce({ ...journeyWithUserTeam, template: true })
        // lookup duplicate journey once created and authorize
        .mockResolvedValueOnce(journeyWithUserTeam)
      await resolver.journeyDuplicate(ability, 'journeyId', 'userId', 'teamId')
      expect(prismaService.journey.create).toHaveBeenCalledWith({
        data: {
          ...omit(journey, [
            'parentBlockId',
            'nextBlockId',
            'hostId',
            'primaryImageBlockId',
            'publishedAt',
            'teamId',
            'createdAt'
          ]),
          id: 'duplicateJourneyId',
          status: JourneyStatus.draft,
          slug: `${journey.title}-copy`,
          title: `${journey.title} copy`,
          template: false,
          team: {
            connect: { id: 'teamId' }
          },
          userJourneys: {
            create: {
              userId: 'userId',
              role: UserJourneyRole.owner
            }
          }
        }
      })
    })
    it('duplicates blocks in journey', async () => {
      mockUuidv4.mockReturnValueOnce(duplicatedStep.id)
      mockUuidv4.mockReturnValueOnce(duplicatedNextStep.id)
      const duplicateStepIds = new Map([
        [step.id, duplicatedStep.id],
        [nextStep.id, duplicatedNextStep.id]
      ])
      prismaService.block.findMany
        .mockReset()
        .mockResolvedValueOnce([step, nextStep])
      await resolver.journeyDuplicate(ability, 'journeyId', 'userId', 'teamId')
      expect(blockService.getDuplicateChildren).toHaveBeenCalledWith(
        [step, nextStep],
        'journeyId',
        null,
        duplicateStepIds,
        'duplicateJourneyId',
        duplicateStepIds
      )
      expect(blockService.saveAll).toHaveBeenCalledWith([
        {
          ...omit(duplicatedStep, [
            'journeyId',
            'parentBlockId',
            'posterBlockId',
            'coverBlockId',
            'nextBlockId',
            'action'
          ]),
          journey: { connect: { id: 'duplicateJourneyId' } }
        },
        {
          ...omit(duplicatedButton, [
            'journeyId',
            'parentBlockId',
            'posterBlockId',
            'coverBlockId',
            'nextBlockId',
            'action'
          ]),
          journey: { connect: { id: 'duplicateJourneyId' } }
        },
        {
          ...omit(duplicatedNextStep, [
            'journeyId',
            'parentBlockId',
            'posterBlockId',
            'coverBlockId',
            'nextBlockId',
            'action'
          ]),
          journey: { connect: { id: 'duplicateJourneyId' } }
        }
      ])
    })
    it('increments copy number on journey if multiple duplicates exist', async () => {
      prismaService.journey.findMany
        .mockReset()
        .mockResolvedValueOnce([
          journey,
          { ...journey, title: `${journey.title} copy` },
          { ...journey, title: `${journey.title} copy other` }
        ])
      await resolver.journeyDuplicate(ability, 'journeyId', 'userId', 'teamId')
      expect(prismaService.journey.create).toHaveBeenCalledWith({
        data: {
          ...omit(journey, [
            'parentBlockId',
            'nextBlockId',
            'hostId',
            'primaryImageBlockId',
            'publishedAt',
            'teamId',
            'createdAt'
          ]),
          id: 'duplicateJourneyId',
          status: JourneyStatus.draft,
          slug: `${journey.title}-copy-2`,
          title: `${journey.title} copy 2`,
          template: false,
          team: {
            connect: { id: 'teamId' }
          },
          userJourneys: {
            create: {
              userId: 'userId',
              role: UserJourneyRole.owner
            }
          }
        }
      })
    })
    it('should duplicate the primaryImageBlock and add it to the duplicated journey', async () => {
      prismaService.journey.findUnique
        .mockReset()
        // lookup existing journey to duplicate and authorize
        .mockResolvedValueOnce({
          ...journeyWithUserTeam,
          primaryImageBlockId: primaryImage.id
        })
        // lookup duplicate journey once created and authorize
        .mockResolvedValueOnce(journeyWithUserTeam)
      prismaService.block.findUnique.mockResolvedValueOnce(primaryImage)
      mockUuidv4.mockReturnValueOnce(duplicatedStep.id)
      mockUuidv4.mockReturnValueOnce(duplicatedNextStep.id)
      mockUuidv4.mockReturnValueOnce(duplicatedPrimaryImage.id)
      const duplicateStepIds = new Map([
        [step.id, duplicatedStep.id],
        [nextStep.id, duplicatedNextStep.id]
      ])
      prismaService.block.findMany
        .mockReset()
        .mockResolvedValueOnce([step, nextStep])
      await resolver.journeyDuplicate(ability, 'journeyId', 'userId', 'teamId')
      expect(blockService.getDuplicateChildren).toHaveBeenCalledWith(
        [step, nextStep],
        'journeyId',
        null,
        duplicateStepIds,
        'duplicateJourneyId',
        duplicateStepIds
      )
      expect(blockService.saveAll).toHaveBeenCalledWith([
        {
          ...omit(duplicatedStep, [
            'journeyId',
            'parentBlockId',
            'posterBlockId',
            'coverBlockId',
            'nextBlockId',
            'action'
          ]),
          journey: { connect: { id: 'duplicateJourneyId' } }
        },
        {
          ...omit(duplicatedButton, [
            'journeyId',
            'parentBlockId',
            'posterBlockId',
            'coverBlockId',
            'nextBlockId',
            'action'
          ]),
          journey: { connect: { id: 'duplicateJourneyId' } }
        },
        {
          ...omit(duplicatedNextStep, [
            'journeyId',
            'parentBlockId',
            'posterBlockId',
            'coverBlockId',
            'nextBlockId',
            'action'
          ]),
          journey: { connect: { id: 'duplicateJourneyId' } }
        },
        {
          ...omit(duplicatedPrimaryImage, [
            'journeyId',
            'parentBlockId',
            'posterBlockId',
            'coverBlockId',
            'nextBlockId',
            'action'
          ]),
          journey: { connect: { id: 'duplicateJourneyId' } }
        }
      ])
    })
    it('should duplicate actions', async () => {
      mockUuidv4.mockReturnValueOnce(duplicatedStep.id)
      mockUuidv4.mockReturnValueOnce(duplicatedNextStep.id)
      mockUuidv4.mockReturnValueOnce(duplicatedButton.id)
      const duplicateStepIds = new Map([
        [step.id, duplicatedStep.id],
        [nextStep.id, duplicatedNextStep.id]
      ])
      prismaService.block.findMany
        .mockReset()
        .mockResolvedValueOnce([step, nextStep])
      await resolver.journeyDuplicate(ability, 'journeyId', 'userId', 'teamId')
      expect(blockService.getDuplicateChildren).toHaveBeenCalledWith(
        [step, nextStep],
        'journeyId',
        null,
        duplicateStepIds,
        'duplicateJourneyId',
        duplicateStepIds
      )
      expect(prismaService.action.create).toHaveBeenCalledWith({
        data: {
          ...duplicatedButton.action,
          blockId: duplicatedNextStep.id,
          parentBlockId: duplicatedButton.id
        }
      })
    })
    it('throws error and does not get stuck in retry loop', async () => {
      prismaService.journey.create.mockRejectedValueOnce(
        new Error('database error')
      )
      await expect(
        resolver.journeyDuplicate(ability, 'journeyId', 'userId', 'teamId')
      ).rejects.toThrow('database error')
    })
    it('throws error if existing journey not authorized', async () => {
      prismaService.journey.findUnique
        .mockReset()
        .mockResolvedValueOnce(journey)
      await expect(
        resolver.journeyDuplicate(ability, 'journeyId', 'userId', 'teamId')
      ).rejects.toThrow('user is not allowed to duplicate journey')
    })
    it('throws error if existing journey not found', async () => {
      prismaService.journey.findUnique.mockReset().mockResolvedValueOnce(null)
      await expect(
        resolver.journeyDuplicate(ability, 'journeyId', 'userId', 'teamId')
      ).rejects.toThrow('journey not found')
    })
    it('throws error if duplicate journey not authorized', async () => {
      prismaService.journey.findUnique
        .mockReset()
        .mockResolvedValueOnce(journeyWithUserTeam)
        .mockResolvedValueOnce(journey)
      await expect(
        resolver.journeyDuplicate(ability, 'journeyId', 'userId', 'teamId')
      ).rejects.toThrow('user is not allowed to duplicate journey')
    })
    it('throws error if duplicate journey not found', async () => {
      prismaService.journey.findUnique
        .mockReset()
        .mockResolvedValueOnce(journeyWithUserTeam)
        .mockResolvedValueOnce(null)
      await expect(
        resolver.journeyDuplicate(ability, 'journeyId', 'userId', 'teamId')
      ).rejects.toThrow('journey not found')
    })
  })
  describe('journeyUpdate', () => {
    const host: Host = {
      id: 'hostId',
      teamId: 'teamId',
      title: 'Bob & Sarah Jones',
      location: 'Dunedin, New Zealand',
      src1: 'avatar1-id',
      src2: 'avatar2-id',
      updatedAt: new Date()
    }
    it('updates a journey', async () => {
      prismaService.journey.findUnique.mockResolvedValueOnce(
        journeyWithUserTeam
      )
      await resolver.journeyUpdate(ability, 'journeyId', {
        title: 'new title',
        languageId: '529',
        slug: 'new-slug'
      })
      expect(prismaService.journey.update).toHaveBeenCalledWith({
        where: { id: 'journeyId' },
        data: {
          title: 'new title',
          languageId: '529',
          slug: 'new-slug'
        }
      })
    })
    it('updates a journey with host', async () => {
      prismaService.host.findUnique.mockResolvedValueOnce(host)
      prismaService.journey.findUnique.mockResolvedValueOnce(
        journeyWithUserTeam
      )
      await resolver.journeyUpdate(ability, 'journeyId', { hostId: 'hostId' })
      expect(prismaService.journey.update).toHaveBeenCalledWith({
        where: { id: 'journeyId' },
        data: { hostId: 'hostId' }
      })
    })
    it('updates a journey without title when title is null', async () => {
      prismaService.journey.findUnique.mockResolvedValueOnce(
        journeyWithUserTeam
      )
      await resolver.journeyUpdate(ability, 'journeyId', { title: null })
      expect(prismaService.journey.update).toHaveBeenCalledWith({
        where: { id: 'journeyId' },
        data: { title: undefined }
      })
    })
    it('updates a journey without languageId when languageId is null', async () => {
      prismaService.journey.findUnique.mockResolvedValueOnce(
        journeyWithUserTeam
      )
      await resolver.journeyUpdate(ability, 'journeyId', { languageId: null })
      expect(prismaService.journey.update).toHaveBeenCalledWith({
        where: { id: 'journeyId' },
        data: { languageId: undefined }
      })
    })
    it('updates a journey without slug when slug is null', async () => {
      prismaService.journey.findUnique.mockResolvedValueOnce(
        journeyWithUserTeam
      )
      await resolver.journeyUpdate(ability, 'journeyId', { slug: null })
      expect(prismaService.journey.update).toHaveBeenCalledWith({
        where: { id: 'journeyId' },
        data: { slug: undefined }
      })
    })
    it('throws error if host not found', async () => {
      prismaService.host.findUnique.mockResolvedValueOnce(null)
      prismaService.journey.findUnique.mockResolvedValueOnce(
        journeyWithUserTeam
      )
      await expect(
        resolver.journeyUpdate(ability, 'journeyId', { hostId: 'hostId' })
      ).rejects.toThrow('host not found')
    })
    it('throws error if host does not belong to same team as journey', async () => {
      prismaService.host.findUnique.mockResolvedValueOnce({
        ...host,
        teamId: 'otherTeamId'
      })
      prismaService.journey.findUnique.mockResolvedValueOnce(
        journeyWithUserTeam
      )
      await expect(
        resolver.journeyUpdate(ability, 'journeyId', { hostId: 'hostId' })
      ).rejects.toThrow(
        'the team id of host does not not match team id of journey'
      )
    })
    it('throws error if slug is not unique', async () => {
      prismaService.journey.findUnique.mockResolvedValueOnce(
        journeyWithUserTeam
      )
      prismaService.journey.update.mockRejectedValueOnce({
        code: ERROR_PSQL_UNIQUE_CONSTRAINT_VIOLATED
      })
      await expect(
        resolver.journeyUpdate(ability, 'journeyId', {
          slug: 'untitled-journey'
        })
      ).rejects.toThrow('slug is not unique')
    })
    it('throws error if update fails', async () => {
      prismaService.journey.findUnique.mockResolvedValueOnce(
        journeyWithUserTeam
      )
      prismaService.journey.update.mockRejectedValueOnce(
        new Error('database error')
      )
      await expect(
        resolver.journeyUpdate(ability, 'journeyId', {
          slug: 'untitled-journey'
        })
      ).rejects.toThrow('database error')
    })
    it('throws error if not authorized', async () => {
      prismaService.journey.findUnique.mockResolvedValueOnce(journey)
      await expect(
        resolver.journeyUpdate(ability, 'journeyId', { title: 'new title' })
      ).rejects.toThrow('user is not allowed to update journey')
    })

    it('throws error if not found', async () => {
      prismaService.journey.findUnique.mockResolvedValueOnce(null)
      await expect(
        resolver.journeyUpdate(ability, 'journeyId', { title: 'new title' })
      ).rejects.toThrow('journey not found')
    })
  })
  describe('journeyPublish', () => {
    it('publishes a journey', async () => {
      prismaService.journey.findUnique.mockResolvedValueOnce(
        journeyWithUserTeam
      )
      await resolver.journeyPublish(ability, 'journeyId')
      expect(prismaService.journey.update).toHaveBeenCalledWith({
        where: { id: 'journeyId' },
        data: {
          status: JourneyStatus.published,
          publishedAt: new Date()
        }
      })
    })
    it('throws error if not found', async () => {
      prismaService.journey.findUnique.mockResolvedValueOnce(null)
      await expect(
        resolver.journeyPublish(ability, 'journeyId')
      ).rejects.toThrow('journey not found')
    })
    it('throws error if not authorized', async () => {
      prismaService.journey.findUnique.mockResolvedValueOnce(journey)
      await expect(
        resolver.journeyPublish(ability, 'journeyId')
      ).rejects.toThrow('user is not allowed to publish journey')
    })
  })
  describe('journeysArchive', () => {
    it('archives an array of journeys', async () => {
      prismaService.journey.findMany.mockResolvedValueOnce([journey])
      expect(
        await resolver.journeysArchive(accessibleJourneys, ['journeyId'])
      ).toEqual([journey])
      expect(prismaService.journey.updateMany).toHaveBeenCalledWith({
        where: { AND: [accessibleJourneys, { id: { in: ['journeyId'] } }] },
        data: { status: JourneyStatus.archived, archivedAt: new Date() }
      })
      expect(prismaService.journey.findMany).toHaveBeenCalledWith({
        where: { AND: [accessibleJourneys, { id: { in: ['journeyId'] } }] }
      })
    })
  })
  describe('journeysDelete', () => {
    it('deletes an array of journeys', async () => {
      prismaService.journey.findMany.mockResolvedValueOnce([journey])
      expect(
        await resolver.journeysDelete(accessibleJourneys, ['journeyId'])
      ).toEqual([journey])
      expect(prismaService.journey.updateMany).toHaveBeenCalledWith({
        where: { AND: [accessibleJourneys, { id: { in: ['journeyId'] } }] },
        data: { status: JourneyStatus.deleted, deletedAt: new Date() }
      })
      expect(prismaService.journey.findMany).toHaveBeenCalledWith({
        where: { AND: [accessibleJourneys, { id: { in: ['journeyId'] } }] }
      })
    })
  })
  describe('journeysTrash', () => {
    it('trashes an array of journeys', async () => {
      prismaService.journey.findMany.mockResolvedValueOnce([journey])
      expect(
        await resolver.journeysTrash(accessibleJourneys, ['journeyId'])
      ).toEqual([journey])
      expect(prismaService.journey.updateMany).toHaveBeenCalledWith({
        where: { AND: [accessibleJourneys, { id: { in: ['journeyId'] } }] },
        data: { status: JourneyStatus.trashed, trashedAt: new Date() }
      })
      expect(prismaService.journey.findMany).toHaveBeenCalledWith({
        where: { AND: [accessibleJourneys, { id: { in: ['journeyId'] } }] }
      })
    })
  })
  describe('journeysRestore', () => {
    it('resores a published Journey', async () => {
      prismaService.journey.findMany.mockResolvedValueOnce([journey])
      await resolver.journeysRestore(accessibleJourneys, ['journeyId'])
      expect(prismaService.journey.findMany).toHaveBeenCalledWith({
        where: {
          AND: [accessibleJourneys, { id: { in: ['journeyId'] } }]
        }
      })
      expect(prismaService.journey.update).toHaveBeenCalledWith({
        where: { id: 'journeyId' },
        data: { status: JourneyStatus.published }
      })
    })
    it('restores an draft Journey', async () => {
      prismaService.journey.findMany.mockResolvedValueOnce([
        { ...journey, publishedAt: null }
      ])
      await resolver.journeysRestore(accessibleJourneys, ['journeyId'])
      expect(prismaService.journey.findMany).toHaveBeenCalledWith({
        where: {
          AND: [accessibleJourneys, { id: { in: ['journeyId'] } }]
        }
      })
      expect(prismaService.journey.update).toHaveBeenCalledWith({
        where: { id: 'journeyId' },
        data: { status: JourneyStatus.draft }
      })
    })
  })
  describe('journeyTemplate', () => {
    it('throws error if not found', async () => {
      prismaService.journey.findUnique.mockResolvedValueOnce(null)
      await expect(
        resolver.journeyTemplate(ability, 'journeyId', { template: true })
      ).rejects.toThrow('journey not found')
    })
    it('throws error if not authorized', async () => {
      prismaService.journey.findUnique.mockResolvedValueOnce(journey)
      await expect(
        resolver.journeyTemplate(ability, 'journeyId', { template: true })
      ).rejects.toThrow(
        'user is not allowed to change journey to or from a template'
      )
    })
    describe('when user is publisher', () => {
      beforeEach(async () => {
        ability = await new AppCaslFactory().createAbility({
          id: 'userId',
          roles: ['publisher']
        })
      })
      it('updates template', async () => {
        prismaService.journey.findUnique.mockResolvedValueOnce(journey)
        await resolver.journeyTemplate(ability, 'journeyId', { template: true })
        expect(prismaService.journey.update).toHaveBeenCalledWith({
          where: { id: 'journeyId' },
          data: { template: true }
        })
      })
    })
  })
  describe('blocks', () => {
    it('returns blocks', async () => {
      prismaService.block.findMany.mockResolvedValueOnce([block])
      expect(await resolver.blocks(journey)).toEqual([
        { ...block, __typename: 'ImageBlock', typename: undefined }
      ])
      expect(prismaService.block.findMany).toHaveBeenCalledWith({
        include: {
          action: true
        },
        orderBy: {
          parentOrder: 'asc'
        },
        where: {
          journeyId: 'journeyId'
        }
      })
    })
    it('returns blocks without primaryImageBlock', async () => {
      const journeyWithPrimaryImageBlock = {
        ...journey,
        primaryImageBlockId: 'primaryImageBlockId'
      }
      prismaService.block.findMany.mockResolvedValueOnce([block])
      expect(await resolver.blocks(journeyWithPrimaryImageBlock)).toEqual([
        { ...block, __typename: 'ImageBlock', typename: undefined }
      ])
      expect(prismaService.block.findMany).toHaveBeenCalledWith({
        include: {
          action: true
        },
        orderBy: {
          parentOrder: 'asc'
        },
        where: {
          journeyId: 'journeyId',
          id: { not: 'primaryImageBlockId' }
        }
      })
    })
  })
  describe('chatButtons', () => {
    it('should return chatButtons', async () => {
      const chatButton: ChatButton = {
        id: 'chatButtonId',
        link: 'm.me/user',
        platform: 'facebook',
        journeyId: 'journeyId',
        updatedAt: new Date()
      }
      prismaService.chatButton.findMany.mockResolvedValueOnce([chatButton])
      expect(await resolver.chatButtons(journey)).toEqual([chatButton])
      expect(prismaService.chatButton.findMany).toHaveBeenCalledWith({
        where: { journeyId: 'journeyId' }
      })
    })
  })
  describe('host', () => {
    it('returns host', async () => {
      const host: Host = {
        id: 'hostId',
        teamId: 'teamId',
        title: 'Bob & Sarah Jones',
        location: 'Dunedin, New Zealand',
        src1: 'avatar1-id',
        src2: 'avatar2-id',
        updatedAt: new Date()
      }
      const journeyWithHost = {
        ...journeyWithUserTeam,
        hostId: 'hostId'
      }
      prismaService.host.findUnique.mockResolvedValueOnce(host)
      expect(await resolver.host(journeyWithHost)).toEqual(host)
    })
    it('returns null if no hostId', async () => {
      expect(await resolver.host(journey)).toEqual(null)
    })
  })
  describe('primaryImageBlock', () => {
    it('returns primaryImageBlock', async () => {
      const journeyWithPrimaryImageBlock = {
        ...journey,
        primaryImageBlockId: 'blockId'
      }
      prismaService.block.findUnique.mockResolvedValueOnce(block)
      expect(
        await resolver.primaryImageBlock(journeyWithPrimaryImageBlock)
      ).toEqual(block)
      expect(prismaService.block.findUnique).toHaveBeenCalledWith({
        where: { id: 'blockId' },
        include: { action: true }
      })
    })

    it('returns null if no primaryImageBlockId', async () => {
      expect(await resolver.primaryImageBlock(journey)).toEqual(null)
    })
    it('returns null if primaryImageBlock journey is not current journey', async () => {
      const journeyWithPrimaryImageBlockFromDifferentJourney = {
        ...journey,
        id: 'differentJourneyId',
        primaryImageBlockId: 'blockId'
      }
      expect(
        await resolver.primaryImageBlock(
          journeyWithPrimaryImageBlockFromDifferentJourney
        )
      ).toEqual(null)
      expect(prismaService.block.findUnique).toHaveBeenCalledWith({
        where: { id: 'blockId' },
        include: { action: true }
      })
    })
  })
  describe('userJourneys', () => {
    it('returns userJourneys related to current journey', async () => {
      const userJourney: UserJourney = {
        id: 'userJourneyId',
        userId: 'userId',
        journeyId: 'journeyId',
        updatedAt: new Date(),
        role: 'owner',
        openedAt: null
      }
      prismaService.userJourney.findMany.mockResolvedValueOnce([userJourney])
      expect(await resolver.userJourneys(journey)).toEqual([userJourney])
      expect(prismaService.userJourney.findMany).toHaveBeenCalledWith({
        where: { journeyId: journey.id }
      })
    })
  })
  describe('language', () => {
    it('returns object for federation', async () => {
      expect(await resolver.language({ languageId: 'languageId' })).toEqual({
        __typename: 'Language',
        id: 'languageId'
      })
    })
    it('returns object for federation with default when no languageId', async () => {
      expect(await resolver.language({})).toEqual({
        __typename: 'Language',
        id: '529'
      })
    })
  })
})
