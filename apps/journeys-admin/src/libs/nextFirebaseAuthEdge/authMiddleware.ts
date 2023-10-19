import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { authentication } from 'next-firebase-auth-edge/lib/next/middleware'

export async function middleware(request: NextRequest): () => Promise<void> {
  return await authentication(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
    cookieName: 'journeys-admin',
    cookieSignatureKeys: [
      process.env.COOKIE_SECRET_CURRENT,
      process.env.COOKIE_SECRET_PREVIOUS
    ],
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
  })
}

export const config = {
  matcher: [
    '/',
    '/((?!_next|favicon.ico|api|.*\\.).*)',
    '/api/login',
    '/api/logout'
  ]
}
