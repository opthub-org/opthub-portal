import { isSupportLocale } from '@portal/universal_modules/i18n'
import { I18nKey, RESOURCES } from './resources'

/**
 * サーバー側の処理で翻訳する関数を返却する
 * @param locale - 言語
 */
export const getTranslation = (locale: string) => {
  if (!isSupportLocale(locale)) {
    throw new Error(`Unsupported locale: ${locale}`)
  }
  return {
    t: (q: I18nKey, ...args: (string | number | symbol)[]) => {
      try {
        const keys = q.split('.')
        let result = RESOURCES[locale] as Record<string, unknown>
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i]
          const resultKey = result[key]
          if (typeof resultKey === 'string' && i === keys.length - 1)
            return resultKey.replace(/\$(\d)+/g, (_, indexStr) =>
              args[Number(indexStr) - 1].toString()
            )
          else if (typeof resultKey === 'object') {
            result = resultKey as Record<string, unknown>
          } else {
            throw new Error(`Invalid i18n key has detected (${key} of ${q} ).`)
          }
        }
        throw new Error(
          `Invalid i18n key has detected. ${q} is expected string type, but object type.`
        )
      } catch (error) {
        console.error(error)
        return q
      }
    }
  }
}
