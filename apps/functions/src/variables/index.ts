import { config } from 'dotenv'

export const IS_LOCAL = process.env.IS_LOCAL === 'true'
export const IS_EMULATOR = process.env.FUNCTIONS_EMULATOR === 'true'
if (IS_EMULATOR || IS_LOCAL) config()

export const DEFAULT_REGION = 'asia-northeast1' as const

export const PROJECT_ID = 'opthub-portal' as const

export const WEB_HOST = (() => {
  if (IS_EMULATOR || IS_LOCAL) return 'http://localhost:3000'
  return 'https://portal.opthub.ai'
})()
