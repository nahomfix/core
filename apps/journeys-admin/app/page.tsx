import { gql } from '@apollo/client'
import { AuthAction, withUserTokenSSR } from 'next-firebase-auth'
import { ReactElement } from 'react'

import { AcceptAllInvites } from '../__generated__/AcceptAllInvites'
import { GetOnboardingJourneys } from '../__generated__/GetOnboardingJourneys'
import { initAndAuthApp } from '../src/libs/initAndAuthApp'

import ClientApp from './ClientApp'

export const ACCEPT_ALL_INVITES = gql`
  mutation AcceptAllInvites {
    userTeamInviteAcceptAll {
      id
    }
    userInviteAcceptAll {
      id
    }
  }
`

export const GET_ONBOARDING_JOURNEYS = gql`
  query GetOnboardingJourneys($where: JourneysFilter) {
    onboardingJourneys: journeys(where: $where) {
      id
      title
      description
      template
      primaryImageBlock {
        src
      }
    }
  }
`

export default async function IndexPage(): Promise<ReactElement> {
  const { props } = await getServerSideProps()
  return <ClientApp onboardingJourneys={props.onboardingJourneys} />
}

export const dynamic = 'force-dynamic'

const getServerSideProps = withUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN
})(async ({ user, locale, resolvedUrl }) => {
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

  const { data } = await apolloClient.query<GetOnboardingJourneys>({
    query: GET_ONBOARDING_JOURNEYS,
    variables: {
      where: {
        ids: [
          '014c7add-288b-4f84-ac85-ccefef7a07d3',
          'c4889bb1-49ac-41c9-8fdb-0297afb32cd9',
          'e978adb4-e4d8-42ef-89a9-79811f10b7e9',
          '178c01bd-371c-4e73-a9b8-e2bb95215fd8',
          '13317d05-a805-4b3c-b362-9018971d9b57'
        ]
      }
    }
  })

  return {
    props: {
      flags,
      onboardingJourneys: data?.onboardingJourneys,
      ...translations
    }
  }
})

// export default withUser<IndexPageProps>({
//   whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
// })(IndexPage)
