import {
  ApolloClient,
  NormalizedCacheObject,
  createHttpLink
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { User as AuthUser } from 'next-firebase-auth'
import { useMemo } from 'react'

import { cache } from './cache'

export function createApolloClient(
  user?: AuthUser
): ApolloClient<NormalizedCacheObject> {
  const isSsrMode = typeof window === 'undefined'
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GATEWAY_URL
  })

  const authLink = setContext(async (_, { headers }) => {
    const token = await user?.firebaseUser?.getIdToken()

    return {
      headers: {
        ...(!isSsrMode ? headers : []),
        Authorization: token
      }
    }
  })

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: cache(),
    name: 'journeys-admin',
    version: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
  })
}

export function useApollo(
  user?: AuthUser
): ApolloClient<NormalizedCacheObject> {
  return useMemo(() => createApolloClient(user), [user])
}
