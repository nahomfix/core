import { cookies } from 'next/headers'
import { Tokens } from 'next-firebase-auth-edge/lib/auth'
import { filterStandardClaims } from 'next-firebase-auth-edge/lib/auth/claims'
import { getTokens } from 'next-firebase-auth-edge/lib/next/tokens'

import { AuthProvider } from './client-auth-provider'
import { User } from './context'

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

export async function ServerAuthProvider({
  children
}: {
  children: React.ReactNode
}): Promise<React.ReactNode> {
  const tokens = await getTokens(cookies(), {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
    cookieName: 'AuthToken',
    cookieSignatureKeys: [
      process.env.COOKIE_SECRET_CURRENT ?? '',
      process.env.COOKIE_SECRET_PREVIOUS ?? ''
    ],
    cookieSerializeOptions: {
      path: '/',
      httpOnly: true,
      secure:
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ||
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview',
      sameSite: 'lax' as const,
      maxAge: 12 * 60 * 60 * 24 // twelve days
    },
    serviceAccount: {
      projectId: process.env.FIREBASE_PROJECT_ID ?? '',
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL ?? '',
      privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY ?? '').replace(
        /\\n/g,
        '\n'
      )
    }
  })
  const user = tokens != null ? mapTokensToUser(tokens) : null

  return <AuthProvider defaultUser={user}>{children}</AuthProvider>
}
