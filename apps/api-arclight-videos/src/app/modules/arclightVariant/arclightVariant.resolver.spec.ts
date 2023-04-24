import { Test, TestingModule } from '@nestjs/testing'
import { ArclightVariantResolver } from './arclightVariant.resolver'

describe('ArclightVariantResolver', () => {
  let resolver: ArclightVariantResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArclightVariantResolver]
    }).compile()
    resolver = module.get<ArclightVariantResolver>(ArclightVariantResolver)
  })

  describe('language', () => {
    it('returns object for federation', async () => {
      expect(await resolver.language({ languageId: 'languageId' })).toEqual({
        __typename: 'Language',
        id: 'languageId'
      })
    })
  })

  it('returns subtitle count', async () => {
    expect(
      resolver.subtitleCount({
        subtitle: [
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
      await resolver.subtitleCount({
        subtitle: [
          0,
          '',
          undefined,
          null,
          NaN,
          {
            id: 1
          }
        ]
      })
    ).toEqual(1)
  })
})
