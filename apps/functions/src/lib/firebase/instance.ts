import * as admin from 'firebase-admin'
import { Auth, getAuth } from 'firebase-admin/auth'
import { Firestore, getFirestore } from 'firebase-admin/firestore'
import { getStorage, Storage } from 'firebase-admin/storage'

class FirebaseAdmin {
  private static instance: FirebaseAdmin | undefined = undefined
  private _app: admin.app.App | undefined
  private _auth: Auth | undefined
  private _db: Firestore | undefined
  private _storage: Storage | undefined

  static getInstance() {
    if (FirebaseAdmin.instance === undefined) {
      FirebaseAdmin.instance = new FirebaseAdmin()
    }
    return FirebaseAdmin.instance
  }

  public get app() {
    if (this._app !== undefined) return this._app
    this._app = admin.initializeApp()
    return this._app
  }

  public get auth() {
    if (this._auth !== undefined) return this._auth
    this._auth = getAuth(this.app)
    return this._auth
  }

  public get db() {
    if (this._db !== undefined) return this._db
    this._db = getFirestore(this.app)
    return this._db
  }

  public get storage() {
    if (this._storage !== undefined) return this._storage
    this._storage = getStorage(this.app)
    return this._storage
  }
}

// FirebaseAdminクラスのインスタンスを作成
export const fb = FirebaseAdmin.getInstance()
