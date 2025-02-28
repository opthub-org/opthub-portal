import { DocumentData } from './common'

/**
 * アカウント
 */
export interface Account extends DocumentData {
  /**
   * 有効であるかどうか
   */
  isEnabled: boolean

  /**
   * DiscordのユーザID
   */
  discord: string | null

  /**
   * SlackのユーザID
   */
  slack: string | null
}
