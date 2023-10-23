import { NextResponse } from 'next/server'

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? ''
const cookieName = 'journeys-admin'
const cookieSignatureKeys = [
  process.env.COOKIE_SECRET_CURRENT,
  process.env.COOKIE_SECRET_PREVIOUS
]

export const clientConfig = {
  loginPath: '/api/login',
  logoutPath: '/api/logout',
  apiKey,
  cookieName,
  cookieSignatureKeys,
  // cookieSerializeOptions: authConfig.cookieSerializeOptions,
  // serviceAccount: authConfig.serviceAccount,
  handleValidToken: async ({ token, decodedToken }) => {
    console.log('Successfully authenticated', { token, decodedToken })
    return NextResponse.next()
  },
  handleError: async (error) => {
    console.error('Oops, this should not have happened.', { error })
    return NextResponse.next()
  }
}

export const serverConfig = {
  useSecureCookies:
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview',
  firebaseApiKey: apiKey,
  serviceAccount: {
    projectId: process.env.FIREBASE_PROJECT_ID ?? '',
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL ?? '',
    privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY ?? '').replace(
      /\\n/g,
      '\n'
    )
  }
}

export const authConfig = {
  apiKey,
  cookieName,
  cookieSignatureKeys,
  cookieSerializeOptions: {
    path: '/',
    httpOnly: true,
    secure: serverConfig.useSecureCookies,
    sameSite: 'lax' as const,
    maxAge: 12 * 60 * 60 * 24 // twelve days
  },
  serviceAccount: serverConfig.serviceAccount
}
