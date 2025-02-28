import {
  CollectionReference,
  DocumentReference
} from 'firebase-admin/firestore'

/**
 * コレクションの参照
 */
export type ColRef<T> = CollectionReference<T>

/**
 * コレクションの参照
 */
export type DocRef<T> = DocumentReference<T>
