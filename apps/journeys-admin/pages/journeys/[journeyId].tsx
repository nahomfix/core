import { gql } from '@apollo/client'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { AuthAction, withUser, withUserTokenSSR } from 'next-firebase-auth'
import { NextSeo } from 'next-seo'
import { ReactElement, Suspense } from 'react'
import { useTranslation } from 'react-i18next'

import { ActiveJourneyEditContent } from '@core/journeys/ui/EditorProvider'
import { JOURNEY_FIELDS } from '@core/journeys/ui/JourneyProvider/journeyFields'

import { ACCEPT_ALL_INVITES } from '..'
import { AcceptAllInvites } from '../../__generated__/AcceptAllInvites'
import {
  GetAdminJourney,
  GetAdminJourney_journey as Journey
} from '../../__generated__/GetAdminJourney'
import { initAndAuthApp } from '../../src/libs/initAndAuthApp'

export const GET_ADMIN_JOURNEY_INFO = gql`
  ${JOURNEY_FIELDS}
  query GetAdminJourneyInfo($id: ID!) {
    journey: adminJourney(id: $id, idType: databaseId) {
      id
      title
      description
      template
    }
  }
`

interface JourneyEditPageProps {
  journey: Journey
}

const DynamicJourneyEditPageContent = dynamic(
  async () =>
    await import(
      /* webpackChunkName: "JourneyEditPageContent" */
      '../../src/components/JourneyEditPageContent'
    ),
  {
    ssr: false
  }
)

function JourneyEditPage({ journey }: JourneyEditPageProps): ReactElement {
  const { t } = useTranslation('apps-journeys-admin')
  const router = useRouter()

  return (
    <>
      <NextSeo
        title={
          journey.title != null
            ? t('Edit {{title}}', { title: journey.title })
            : t('Edit Journey')
        }
        description={journey.description ?? undefined}
      />
      <Suspense>
        <DynamicJourneyEditPageContent
          id={journey.id}
          stepId={router.query.stepId as string | undefined}
          view={router.query.view as ActiveJourneyEditContent | undefined}
        />
      </Suspense>
    </>
  )
}

export const getServerSideProps = withUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN
})(async ({ user, locale, query, resolvedUrl }) => {
  if (user == null)
    return { redirect: { permanent: false, destination: '/users/sign-in' } }

  const { apolloClient, flags, redirect, translations } = await initAndAuthApp({
    user,
    locale,
    resolvedUrl
  })

  if (redirect != null) return { redirect }

  await apolloClient.mutate<AcceptAllInvites>({
    mutation: ACCEPT_ALL_INVITES
  })

  let journey: Journey | null
  try {
    const { data } = await apolloClient.query<GetAdminJourney>({
      query: GET_ADMIN_JOURNEY_INFO,
      variables: {
        id: query?.journeyId
      }
    })

    journey = data?.journey
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: `/`
      }
    }
  }

  if (journey?.template === true) {
    return {
      redirect: {
        permanent: false,
        destination: `/publisher/${journey?.id}/edit`
      }
    }
  }

  return {
    props: {
      flags,
      ...translations,
      journey
    }
  }
})

export default withUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(JourneyEditPage)
