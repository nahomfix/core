import { AuthProvider } from './client-auth-provider'

import { getAuthUser } from './user'

export async function ServerAuthProvider({
  children
}: {
  children: React.ReactNode
}): Promise<React.ReactNode> {
  const user = getAuthUser()

  return <AuthProvider defaultUser={user}>{children}</AuthProvider>
}
