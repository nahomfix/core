import type { NextRequest } from 'next/server'

import { authentication } from 'next-firebase-auth-edge/lib/next/middleware'
import { clientConfig } from './config'

export async function middleware(request: NextRequest): () => Promise<void> {
  return await authentication(request, clientConfig)
}

export const config = {
  matcher: [
    '/',
    '/((?!_next|favicon.ico|api|.*\\.).*)',
    '/api/login',
    '/api/logout'
  ]
}
