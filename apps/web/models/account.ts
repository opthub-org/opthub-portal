import { fb } from '@/lib/firebase/instance'
import { Account, Client } from '@portal/universal_modules/schema'
import { deserializeToClientData } from '@portal/universal_modules/serializer/client'
import { collection, doc, getDoc } from 'firebase/firestore'
import { converter } from './converter'
import { ColRef } from './type'

/**
 * アカウントのコレクションの参照
 */
export const accountsRef = collection(fb.db, 'accounts').withConverter(
  converter
) as ColRef<Client<Account>>

/**
 * アカウントのドキュメントの参照
 * @param id - UID
 */
export const accountRef = (id: string) => doc(accountsRef, id)

/**
 * アカウントのドキュメントを取得 (ない場合は作成して取得) する
 */
export const getOrCreateCurrentUserAccount = async (): Promise<
  Client<Account>
> => {
  const user = fb.auth.currentUser
  if (!user) throw new Error('User is not signed in')
  const snap = await getDoc(accountRef(user.uid))
  if (snap.exists()) return snap.data()
  const { data } = await fb.call('createAccount')({})
  return deserializeToClientData(data)
}
