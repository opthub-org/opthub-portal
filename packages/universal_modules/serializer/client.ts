import { Timestamp as ClientTimestamp } from 'firebase/firestore'
import { Client, DocumentData, Timestamp } from '../schema'
import { convert } from './common'

const isSerializedTimestamp = (value: unknown): value is Timestamp =>
  value !== null &&
  typeof value === 'object' &&
  'type' in value &&
  value.type === 'timestamp' &&
  'seconds' in value &&
  typeof value.seconds === 'number' &&
  'nanoseconds' in value &&
  typeof value.nanoseconds === 'number'

/**
 * シリアライズされたデータをFirestore (Client SDK) のデータに変換する関数
 * @param data - シリアライズされたデータ
 */
export const deserializeToClientData = <T extends DocumentData>(data: T) => {
  return convert(data, (value) => {
    if (isSerializedTimestamp(value)) {
      return new ClientTimestamp(value.seconds, value.nanoseconds)
    }
    return value
  }) as Client<T>
}
