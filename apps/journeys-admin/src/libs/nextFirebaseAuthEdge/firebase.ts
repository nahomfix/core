import {
  FirebaseApp,
  FirebaseOptions,
  getApp,
  getApps,
  initializeApp
} from 'firebase/app'
import { getAuth } from 'firebase/auth'

import { clientConfig } from '../config/client-config'

const getFirebaseApp = (options: FirebaseOptions): FirebaseApp => {
  return getApps().length === 0 ? initializeApp(options) : getApp()
}

export const useFirebaseAuth = () => {
  const getFirebaseAuth = () => getAuth(getFirebaseApp(clientConfig))

  return { getFirebaseAuth }
}
