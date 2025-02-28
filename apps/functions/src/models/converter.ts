import { DocumentSnapshot } from 'firebase-admin/firestore'

/**
 * Converter
 */
export const converter = {
  toFirestore: (data: Record<string, unknown>) => {
    const { id, ...rest } = data
    return rest
  },
  fromFirestore: (snapshot: DocumentSnapshot) => {
    const data = snapshot.data()
    return {
      ...data,
      id: snapshot.id
    }
  }
}
