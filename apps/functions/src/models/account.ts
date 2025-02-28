import { fb } from '@/lib/firebase/instance'
import { Account, Admin } from '@portal/universal_modules/schema'
import { converter } from './converter'
import { ColRef } from './type'

/**
 * アカウントのコレクションの参照
 */
export const accountsRef = fb.db
  .collection('accounts')
  .withConverter(converter) as ColRef<Admin<Account>>

/**
 * アカウントのドキュメントの参照
 * @param id - ユーザID
 */
export const accountRef = (id: string) => accountsRef.doc(id)
