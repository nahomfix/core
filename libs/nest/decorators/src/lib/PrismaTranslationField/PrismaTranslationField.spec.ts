import { Translation } from '@core/nest/common/TranslationModule'
import { Content } from './PrismaTranslationField'
import { PrismaTranslationField } from '.'

describe('PrismaTranslationField', () => {
  describe('when array of translations', () => {
    const parent: { name: Content } = {
      name: {
        text: '普通話',
        languageId: '20615',
        translations: [
          {
            text: 'Chinese, Mandarin',
            languageId: '529'
          }
        ]
      }
    }

    const translations: Translation[] = [
      {
        value: '普通話',
        languageId: '20615',
        primary: true
      },
      {
        value: 'Chinese, Mandarin',
        languageId: '529',
        primary: false
      }
    ]

    class Translatable {
      @PrismaTranslationField('name')
      name(
        _parent: { [key: string]: Content },
        _languageId?: string,
        _primary?: boolean
      ): void {}
    }

    it('should return translations', () => {
      expect(new Translatable().name(parent)).toEqual(translations)
    })

    it('should return translations filtered by languageId', () => {
      expect(new Translatable().name(parent, '529')).toEqual([translations[1]])
    })

    it('should return translations filtered by primary', () => {
      expect(new Translatable().name(parent, undefined, true)).toEqual([
        translations[0]
      ])
    })

    it('should return tranlsations filtered by languageId or primary and sorted by not-primary', () => {
      expect(new Translatable().name(parent, '529', true)).toEqual(translations)
    })
  })
})
