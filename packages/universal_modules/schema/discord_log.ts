import { DocumentData } from './common'

type VoiceChannel = {
  /**
   * カテゴリ
   */
  category?: {
    id: string
    name: string
  }

  /**
   * チャンネル
   */
  channel: {
    id: string
    name: string
  }
}

/**
 * アカウント
 */
export interface DiscordLogBase extends DocumentData {
  /**
   * ユーザID
   */
  userId: string

  /**
   * ログの種類
   */
  action: 'move' | 'join' | 'leave'

  /**
   * 前のボイスチャンネル
   */
  before?: VoiceChannel

  /**
   * 後のボイスチャンネル
   */
  after?: VoiceChannel
}

/**
 * ボイスチャンネル移動時のDiscordのログ
 */
export interface MoveDiscordLog extends DiscordLogBase {
  /**
   * ログの種類
   */
  action: 'move'

  /**
   * 前のボイスチャンネル
   */
  before: VoiceChannel

  /**
   * 後のボイスチャンネル
   */
  after: VoiceChannel
}

/**
 * ボイスチャンネル参加時のDiscordのログ
 */
export interface JoinDiscordLog extends DiscordLogBase {
  /**
   * ログの種類
   */
  action: 'join'

  /**
   * 前のボイスチャンネル
   */
  before?: undefined

  /**
   * 後のボイスチャンネル
   */
  after: VoiceChannel
}

/**
 * ボイスチャンネル参加時のDiscordのログ
 */
export interface LeaveDiscordLog extends DiscordLogBase {
  /**
   * ログの種類
   */
  action: 'leave'

  /**
   * 前のボイスチャンネル
   */
  before: VoiceChannel

  /**
   * 後のボイスチャンネル
   */
  after?: undefined
}

/**
 * Discordのログ
 */
export type DiscordLog = MoveDiscordLog | JoinDiscordLog | LeaveDiscordLog
