import { ReactElement } from 'react'
import { appWithTranslation } from 'next-i18next'
import i18nConfig from '../next-i18next.config'

export function I18nProvider(children: any): ReactElement {
  return appWithTranslation(() => children, i18nConfig)
}
