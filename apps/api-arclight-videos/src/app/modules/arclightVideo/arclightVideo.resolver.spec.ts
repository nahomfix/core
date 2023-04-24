import { Test, TestingModule } from '@nestjs/testing'
import { GraphQLResolveInfo, Kind } from 'graphql'
import { IdType } from '../../__generated__/graphql'
import {
  LanguageWithSlugResolver,
  ArclightVideoResolver
} from './arclightVideo.resolver'
import { ArclightVideoService } from './arclightVideo.service'

describe('VideoResolver', () => {
  let resolver: ArclightVideoResolver, service: ArclightVideoService

  const arclightVideo = {
    id: '20615',
    bcp47: 'zh',
    name: [
      {
        value: '普通話',
        primary: true,
        videoId: '20615'
      },
      {
        value: 'Chinese, Mandarin',
        primary: false,
        videoId: '529'
      }
    ],
    slug: 'video-slug',
    variant: [
      {
        slug: 'jesus/english'
      }
    ]
  }

  beforeEach(async () => {
    const ArclightService = {
      provide: ArclightVideoService,
      useFactory: () => ({
        filterAll: jest.fn(() => [arclightVideo, arclightVideo]),
        getArclightVideosByIds: jest.fn(() => [arclightVideo, arclightVideo]),
        getArclightVideo: jest.fn(() => arclightVideo),
        getArclightVideoBySlug: jest.fn(() => arclightVideo)
      })
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArclightVideoResolver, ArclightVideoService]
    }).compile()
    resolver = module.get<ArclightVideoResolver>(ArclightVideoResolver)
    service = await module.resolve(ArclightVideoService)
  })

  describe('arclightVideos', () => {
    it('returns ArclightVideos', async () => {
      const info = {
        fieldNodes: [{ selectionSet: { selections: [] } }]
      } as unknown as GraphQLResolveInfo
      expect(await resolver.arclightVideos(info)).toEqual([
        arclightVideo,
        arclightVideo
      ])
      expect(service.filterAll).toHaveBeenCalledWith({})
    })

    it('returns arclightVideos filtered by variant language id with string argument', async () => {
      const info = {
        fieldNodes: [
          {
            selectionSet: {
              selections: [
                {
                  kind: Kind.FIELD,
                  name: { value: 'variant' },
                  arguments: [
                    {
                      name: { value: 'languageId' },
                      value: { value: 'en' }
                    }
                  ]
                }
              ]
            }
          }
        ]
      } as unknown as GraphQLResolveInfo
      expect(
        await resolver.arclightVideos(
          info,
          {
            title: 'abc',
            availableVariantLanguageIds: ['fr'],
            ids: ['1_jf-0-0']
          },
          100,
          200
        )
      ).toEqual([arclightVideo, arclightVideo])
      expect(service.filterAll).toHaveBeenCalledWith({
        title: 'abc',
        availableVariantLanguageIds: ['fr'],
        ids: ['1_jf-0-0'],
        variantLanguageId: 'en',
        offset: 100,
        limit: 200
      })
    })

    it('returns arclightVideos filtered by variant language id with variable argument', async () => {
      const info = {
        fieldNodes: [
          {
            selectionSet: {
              selections: [
                {
                  kind: Kind.FIELD,
                  name: { value: 'variant' },
                  arguments: [
                    {
                      name: { value: 'languageId' },
                      value: {
                        kind: Kind.VARIABLE,
                        name: { value: 'customLanguageId' }
                      }
                    }
                  ]
                }
              ]
            }
          }
        ],
        variableValues: {
          customLanguageId: 'en'
        }
      } as unknown as GraphQLResolveInfo
      expect(
        await resolver.arclightVideos(
          info,
          {
            title: 'abc',
            availableVariantLanguageIds: ['fr'],
            ids: ['1_jf-0-0']
          },
          100,
          200
        )
      ).toEqual([arclightVideo, arclightVideo])
      expect(service.filterAll).toHaveBeenCalledWith({
        title: 'abc',
        availableVariantLanguageIds: ['fr'],
        ids: ['1_jf-0-0'],
        variantLanguageId: 'en',
        offset: 100,
        limit: 200
      })
    })
  })

  describe('arclightVideo', () => {
    const info = {
      fieldNodes: [{ selectionSet: { selections: [] } }]
    } as unknown as GraphQLResolveInfo
    it('return an arclightVideo', async () => {
      expect(await resolver.arclightVideo(info, '20615')).toEqual(arclightVideo)
      expect(service.getArclightVideo).toHaveBeenCalledWith('20615', undefined)
    })

    it('returns an arclightVideo filtered by variant language id with string argument', async () => {
      const filteredInfo = {
        fieldNodes: [
          {
            selectionSet: {
              selections: [
                {
                  name: { value: 'variant' },
                  kind: Kind.FIELD,
                  arguments: [
                    {
                      name: { value: 'languageId' },
                      value: { value: 'en' }
                    }
                  ]
                }
              ]
            }
          }
        ]
      } as unknown as GraphQLResolveInfo
      expect(await resolver.arclightVideo(filteredInfo, '20615')).toEqual(
        arclightVideo
      )
      expect(service.getArclightVideo).toHaveBeenCalledWith('20615', 'en')
    })

    it('returns a video filtered by variant language id with variable argument', async () => {
      const filteredInfo = {
        fieldNodes: [
          {
            selectionSet: {
              selections: [
                {
                  name: { value: 'variant' },
                  kind: Kind.FIELD,
                  arguments: [
                    {
                      name: { value: 'languageId' },
                      value: {
                        kind: Kind.VARIABLE,
                        name: { value: 'customLanguageId' }
                      }
                    }
                  ]
                }
              ]
            }
          }
        ],
        variableValues: {
          customLanguageId: 'en'
        }
      } as unknown as GraphQLResolveInfo
      expect(await resolver.arclightVideo(filteredInfo, '20615')).toEqual(
        arclightVideo
      )
      expect(service.getArclightVideo).toHaveBeenCalledWith('20615', 'en')
    })

    it('should return video with slug as idtype', async () => {
      expect(
        await resolver.arclightVideo(info, 'jesus/english', IdType.slug)
      ).toEqual(arclightVideo)
      expect(service.getArclightVideoBySlug).toHaveBeenCalledWith(
        'jesus/english'
      )
    })
  })

  describe('resolveReference', () => {
    it('returns video', async () => {
      expect(
        await resolver.resolveReference({
          __typename: 'ArclightVideo',
          id: '20615',
          primaryLanguageId: 'en'
        })
      ).toEqual(arclightVideo)
      expect(service.getArclightVideo).toHaveBeenCalledWith('20615', 'en')
    })

    it('returns video if primaryLanguageId is undefined', async () => {
      expect(
        await resolver.resolveReference({
          __typename: 'ArclightVideo',
          id: '20615',
          primaryLanguageId: undefined
        })
      ).toEqual(arclightVideo)
      expect(service.getArclightVideo).toHaveBeenCalledWith('20615', undefined)
    })

    it('returns video if primaryLanguageId is null', async () => {
      expect(
        await resolver.resolveReference({
          __typename: 'ArclightVideo',
          id: '20615',
          primaryLanguageId: null
        })
      ).toEqual(arclightVideo)
      expect(service.getArclightVideo).toHaveBeenCalledWith('20615', undefined)
    })

    it('returns children count', async () => {
      expect(
        resolver.childrenCount({
          childIds: [{ id: '1' }, { id: '2' }, 0, '', undefined, null, NaN]
        })
      ).toEqual(2)
    })
  })

  describe('children', () => {
    it('returns null when no childIds', async () => {
      expect(await resolver.children({ childIds: undefined })).toEqual(null)
    })

    it('returns arclightVideos by childIds without languageId', async () => {
      expect(await resolver.children({ childIds: ['abc', 'def'] })).toEqual([
        arclightVideo,
        arclightVideo
      ])
      expect(service.getArclightVideosByIds).toHaveBeenCalledWith(
        ['abc', 'def'],
        undefined
      )
    })

    it('returns arclightVideos by childIds with languageId', async () => {
      expect(
        await resolver.children({
          childIds: ['abc', 'def'],
          variant: { languageId: '529' }
        })
      ).toEqual([arclightVideo, arclightVideo])
      expect(service.getArclightVideosByIds).toHaveBeenCalledWith(
        ['abc', 'def'],
        '529'
      )
    })
  })

  describe('variantLanguagesCount', () => {
    it('returns variant languages count', async () => {
      expect(
        await resolver.variantLanguagesCount({
          variantLanguages: [
            {
              id: '1'
            },
            {
              id: '2'
            }
          ]
        })
      ).toEqual(2)
    })

    it('does not include falsey values into the count', async () => {
      expect(
        await resolver.variantLanguagesCount({
          variantLanguages: [
            0,
            '',
            undefined,
            null,
            NaN,
            {
              id: '1'
            }
          ]
        })
      ).toEqual(1)
    })
  })
})

describe('LangugageWithSlugResolver', () => {
  let resolver: LanguageWithSlugResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LanguageWithSlugResolver]
    }).compile()
    resolver = module.get<LanguageWithSlugResolver>(LanguageWithSlugResolver)
  })

  it('should resolve field language with slug', async () => {
    expect(await resolver.language({ languageId: 'id' })).toEqual({
      __typename: 'Language',
      id: 'id'
    })
  })
})
