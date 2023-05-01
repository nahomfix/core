import { Translation } from '@core/nest/common/TranslationModule'

export interface Content {
  text: string
  languageId: string
  translations: Array<{
    languageId: string
    text: string
  }>
}

export function PrismaTranslationField(
  name: string
): (
  _target: unknown,
  _propertyKey: string,
  descriptor: PropertyDescriptor
) => void {
  return (
    _target: unknown,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    descriptor.value = function (
      parent: { [key: string]: Content },
      languageId?: string,
      primary?: boolean
    ) {
      const translations = [
        {
          value: parent[name].text,
          languageId: parent[name].languageId,
          primary: true
        },
        ...parent[name].translations.map(({ languageId, text }) => ({
          value: text,
          languageId,
          primary: false
        }))
      ]
      return filterTranslations(translations, languageId, primary)
    }
  }
}

function filterTranslations(
  translations: Translation[],
  languageId?: string,
  primary?: boolean
): Translation[] {
  if (translations == null || (languageId == null && primary == null))
    return translations

  return translations.filter(
    ({ languageId: _languageId, primary: _primary }) =>
      _languageId === languageId || _primary === primary
  )
}
