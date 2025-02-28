import { accountRef } from '@/models/account'
import { onCall } from '@/utils/functions'
import { Account, Admin } from '@portal/universal_modules/schema'
import { serializeAdminData } from '@portal/universal_modules/serializer/server'
import { Timestamp } from 'firebase-admin/firestore'
import { logger } from 'firebase-functions/v2'
import { HttpsError } from 'firebase-functions/v2/https'

export const createAccount = onCall('createAccount', async ({ auth }) => {
  if (auth === undefined) {
    throw new HttpsError('unauthenticated', "You're not authenticated.")
  }
  const now = Timestamp.now()
  const account: Admin<Account> = {
    id: auth.uid,
    createdAt: now,
    updatedAt: now,
    isEnabled: false,
    discord: null,
    slack: null
  }
  await accountRef(auth.uid).set(account)
  logger.info(`Account created: ${auth.uid}`)
  return serializeAdminData(account)
})
