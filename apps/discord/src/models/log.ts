import { fb } from '@/firebase/instance'
import { Admin, DiscordLog } from '@portal/universal_modules/schema'
import { converter } from './converter'
import { ColRef } from './type'

/**
 * Discordのログのコレクションの参照
 */
export const logsRef = fb.db
  .collection('discord_logs')
  .withConverter(converter) as ColRef<Admin<DiscordLog>>

/**
 * Discordのログのドキュメントの参照
 * @param id - ログのID
 */
export const logRef = (id: string) => logsRef.doc(id)
