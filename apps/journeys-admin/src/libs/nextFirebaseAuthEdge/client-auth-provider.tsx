'use client'

import { User as FirebaseUser, onIdTokenChanged } from 'firebase/auth'
import { filterStandardClaims } from 'next-firebase-auth-edge/lib/auth/claims'
import React from 'react'

import { AuthContext, User } from './context'
import { useFirebaseAuth } from './firebase'

export interface AuthProviderProps {
  defaultUser: User | null
  children: React.ReactNode
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  defaultUser,
  children
}) => {
  const { getFirebaseAuth } = useFirebaseAuth()
  const [user, setUser] = React.useState(defaultUser)

  const handleIdTokenChanged = async (
    firebaseUser: FirebaseUser | null
  ): Promise<void> => {
    if (firebaseUser == null) {
      setUser(null)
      return
    }

    const idTokenResult = await firebaseUser.getIdTokenResult()
    await fetch('/api/login', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${idTokenResult.token}`
      }
    })
    setUser({
      ...firebaseUser,
      customClaims: filterStandardClaims(idTokenResult.claims)
    })
  }

  const registerChangeListener = async () => {
    const auth = getFirebaseAuth()
    return onIdTokenChanged(auth, handleIdTokenChanged)
  }

  React.useEffect(() => {
    const unsubscribePromise = registerChangeListener()

    return () => {
      await unsubscribePromise.then((unsubscribe) => unsubscribe())
    }
  })

  return (
    <AuthContext.Provider
      value={{
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
