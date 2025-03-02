import { DocumentData, Timestamp } from './common'

/**
 * 手動の勤怠ログ
 */
export interface ManualLog extends DocumentData {
  /**
   * ユーザID
   */
  userId: string

  /**
   * 日付
   */
  date: Timestamp

  /**
   * 時間
   */
  time: number

  /**
   * 勤怠の種類
   */
  type: 'work' | 'break'
}
