import { DEFAULT_REGION } from '@/variables'
import {
  FunctionParsed,
  FunctionResponse,
  Functions,
  FunctionsRequestParser
} from '@portal/universal_modules/functions'
import { logger } from 'firebase-functions'
import {
  CallableOptions,
  CallableRequest,
  HttpsError,
  onCall as onCallOriginal
} from 'firebase-functions/v2/https'

/**
 * onCall
 * @param key - 関数名
 * @param handler - 関数
 * @param options - オプション
 */
export const onCall = <T extends keyof Functions>(
  key: T,
  handler: (
    req: CallableRequest<FunctionParsed<T>>
  ) => FunctionResponse<T> | Promise<FunctionResponse<T>>,
  options?: CallableOptions
) => {
  return onCallOriginal<
    Record<string, unknown>,
    FunctionResponse<T> | Promise<FunctionResponse<T>>
  >(
    {
      region: DEFAULT_REGION,
      memory: '512MiB',
      cors: [/^(.*\.)?opthub\.ai$/],
      ...options
    },
    (req) => {
      logger.debug('Request raw data: ', req.data)
      logger.debug('key: ', key)
      const { success, data, error } = FunctionsRequestParser[key].safeParse(
        req.data
      )
      if (!success) {
        logger.error(error)
        throw new HttpsError('invalid-argument', error.toString())
      }
      return handler({ ...req, data })
    }
  )
}
