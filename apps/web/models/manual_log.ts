import { fb } from '@/lib/firebase/instance'
import { Client, ManualLog } from '@portal/universal_modules/schema'
import {
  collection,
  doc,
  orderBy,
  query,
  Timestamp,
  where
} from 'firebase/firestore'
import { converter } from './converter'
import { ColRef } from './type'

/**
 * 手動の勤怠ログのコレクションの参照
 */
export const manualLogsRef = collection(fb.db, 'manual_logs').withConverter(
  converter
) as ColRef<Client<ManualLog>>

/**
 * 手動の勤怠ログのドキュメントの参照
 * @param id - ログのID
 */
export const manualLogRef = (id: string) => doc(manualLogsRef, id)

/**
 * 手動の勤怠ログのクエリ
 * @param uid - ユーザID
 * @param start - 開始日
 * @param end - 終了日
 */
export const manualLogsQuery = (uid: string, start: Date, end: Date) => {
  return query(
    manualLogsRef,
    where('userId', '==', uid),
    where('createdAt', '>=', Timestamp.fromDate(start)),
    where('createdAt', '<', Timestamp.fromDate(end)),
    orderBy('createdAt', 'asc')
  )
}
