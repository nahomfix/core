// import { AuthAction, withUser, withUserTokenSSR } from 'next-firebase-auth-edge'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

import i18nConfig from '../../next-i18next.config'
import { SignIn } from '../../src/components/SignIn'

export default function SignInPage(): ReactElement {
  const { t } = useTranslation('apps-journeys-admin')
  return (
    <>
      <NextSeo title={t('Sign In')} />
      <SignIn />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale ?? 'en',
        ['apps-journeys-admin', 'libs-journeys-ui'],
        i18nConfig
      ))
    }
  }
}
