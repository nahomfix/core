import {
  FirebaseApp,
  FirebaseOptions,
  getApp,
  getApps,
  initializeApp
} from 'firebase/app'
import { getAuth } from 'firebase/auth'

const getFirebaseApp = (options: FirebaseOptions): FirebaseApp => {
  return getApps().length === 0 ? initializeApp(options) : getApp()
}

export const useFirebaseAuth = () => {
  const getFirebaseAuth = () =>
    getAuth(
      getFirebaseApp({
        redirectUrl: '/users/sign-in',
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ?? '',
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
        messagingSenderId:
          process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? ''
      })
    )

  return { getFirebaseAuth }
}
