import { DocumentSnapshot } from 'firebase/firestore'

/**
 * Converter
 */
export const converter = {
  // toFirestoreはupdate時には呼ばれないので十分注意すること
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
