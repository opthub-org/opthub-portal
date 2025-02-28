import { Timestamp as AdminTimestamp } from 'firebase-admin/firestore'
import { Timestamp as ClientTimestamp } from 'firebase/firestore'
/**
 * タイムスタンプ
 */
export type Timestamp = {
  /**
   * 種別
   */
  type: 'timestamp'
  /**
   * 秒
   */
  seconds: number
  /**
   * ナノ秒
   */
  nanoseconds: number
}

/**
 * Firestoreに格納されているデータ
 */
export interface DocumentData {
  /**
   * ドキュメントID
   */
  id: string

  /**
   * 作成日時
   */
  createdAt: Timestamp

  /**
   * 更新日時
   */
  updatedAt: Timestamp
}

/**
 * Admin用のデータ
 */
export type Admin<T extends DocumentData> = {
  [K in keyof T]: T[K] extends Timestamp ? AdminTimestamp : T[K]
}

/**
 * Client用のデータ
 */
export type Client<T extends DocumentData> = {
  [K in keyof T]: T[K] extends Timestamp ? ClientTimestamp : T[K]
}
