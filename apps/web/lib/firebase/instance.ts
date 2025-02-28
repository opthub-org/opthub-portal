import { FIREBASE_CONFIG, NODE_ENV, USE_EMULATOR } from '@/variables'
import {
  FunctionNames,
  FunctionRequest,
  FunctionResponse
} from '@portal/universal_modules/functions'
import { getAnalytics } from 'firebase/analytics'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { Auth, getAuth } from 'firebase/auth'
import { Firestore, initializeFirestore } from 'firebase/firestore'
import {
  connectFunctionsEmulator,
  Functions as FirebaseFunctions,
  getFunctions,
  httpsCallable
} from 'firebase/functions'
import { FirebaseStorage, getStorage } from 'firebase/storage'

class Firebase {
  public static instance: Firebase | undefined = undefined
  public _app: FirebaseApp | undefined
  public _auth: Auth | undefined
  public _db: Firestore | undefined
  public _storage: FirebaseStorage | undefined
  public _functions: FirebaseFunctions | undefined

  static getInstance() {
    if (Firebase.instance === undefined) {
      Firebase.instance = new Firebase()
    }
    return Firebase.instance
  }

  get app() {
    if (this._app !== undefined) return this._app
    this._app = initializeApp(FIREBASE_CONFIG)
    return this._app
  }

  get auth() {
    if (this._auth !== undefined) return this._auth
    this._auth = getAuth(this.app)
    return this._auth
  }

  get db() {
    if (this._db !== undefined) return this._db
    this._db = initializeFirestore(this.app, {
      ignoreUndefinedProperties: true
    })
    return this._db
  }

  get storage() {
    if (this._storage !== undefined) return this._storage
    this._storage = getStorage(this.app)
    return this._storage
  }

  get functions() {
    if (this._functions !== undefined) return this._functions
    this._functions = getFunctions(this.app, 'asia-northeast1')
    if (NODE_ENV === 'development' && USE_EMULATOR) {
      connectFunctionsEmulator(this._functions, 'localhost', 5001)
    }
    return this._functions
  }

  get analytics() {
    return getAnalytics(this.app)
  }

  call<T extends FunctionNames>(funcName: T) {
    return async (
      params: FunctionRequest<T>
    ): Promise<{ data: FunctionResponse<T> }> => {
      console.debug('call: ', funcName)
      console.debug('payload: ', params)
      return await httpsCallable<FunctionRequest<T>, FunctionResponse<T>>(
        this.functions,
        funcName
      )(params)
    }
  }
}

export const fb = Firebase.getInstance()
