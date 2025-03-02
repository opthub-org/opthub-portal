import { fb } from '@/lib/firebase/instance'
import { Account, Client, DiscordLog } from '@portal/universal_modules/schema'
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
 * Discordのログのコレクションの参照
 */
export const discordLogsRef = collection(fb.db, 'discord_logs').withConverter(
  converter
) as ColRef<Client<DiscordLog>>

/**
 * Discordのログのドキュメントの参照
 * @param id - ログのID
 */
export const discordLogRef = (id: string) => doc(discordLogsRef, id)

/**
 * Discordのログのクエリ
 * @param account - アカウント
 * @param start - 開始日
 * @param end - 終了日
 */
export const discordLogsQuery = (
  account: Client<Account>,
  start: Date,
  end: Date
) => {
  return query(
    discordLogsRef,
    where('userId', '==', account.discord),
    where('createdAt', '>=', Timestamp.fromDate(start)),
    where('createdAt', '<', Timestamp.fromDate(end)),
    orderBy('createdAt', 'asc')
  )
}
