import { Timestamp as AdminTimestamp } from 'firebase-admin/firestore'
import { Admin, DocumentData } from '../schema'
import { convert } from './common'

/**
 * Admin SDKのFirestoreのデータをシリアライズする関数
 * @param data - Firestore (Admin SDK) のデータ
 */
export const serializeAdminData = <T extends DocumentData>(data: Admin<T>) => {
  return convert(data, (value) => {
    if (value instanceof AdminTimestamp) {
      return {
        type: 'timestamp',
        seconds: value.seconds,
        nanoseconds: value.nanoseconds
      }
    }
    return value
  }) as T
}
