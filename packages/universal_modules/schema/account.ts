import { DocumentData, Timestamp } from './common'

/**
 * アカウント
 */
export interface Account extends DocumentData {
  /**
   * 有効であるかどうか
   */
  type: 'officer' | 'employee' | 'outsourcing'

  /**
   * 名前
   */
  name: string

  /**
   * 有効であるかどうか
   */
  isEnabled: boolean

  /**
   * DiscordのユーザID
   */
  discord?: string

  /**
   * SlackのユーザID
   */
  slack?: {
    uid: string
    channel: string
  }

  /**
   * 時給
   */
  hourlyWage: { amount: number; date: Timestamp }[]
}
