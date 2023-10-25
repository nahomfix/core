import { cookies } from 'next/headers'
import { Tokens } from 'next-firebase-auth-edge/lib/auth'
import { filterStandardClaims } from 'next-firebase-auth-edge/lib/auth/claims'
import { getTokens } from 'next-firebase-auth-edge/lib/next/tokens'

import { authConfig } from './config'
import { User } from './context'

export const getAuthUser = async (): Promise<User | undefined> => {
  const tokens = await getTokens(cookies(), authConfig)
  return tokens != null ? mapTokensToUser(tokens) : undefined
}

const mapTokensToUser = ({ decodedToken }: Tokens): User => {
  const {
    uid,
    email,
    picture: photoURL,
    email_verified: emailVerified,
    phone_number: phoneNumber,
    name: displayName
  } = decodedToken

  const customClaims = filterStandardClaims(decodedToken)

  return {
    uid,
    email: email ?? null,
    displayName: displayName ?? null,
    photoURL: photoURL ?? null,
    phoneNumber: phoneNumber ?? null,
    emailVerified: emailVerified ?? false,
    customClaims
  }
}
