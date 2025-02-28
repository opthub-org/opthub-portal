'use client'

import { Locale, isSupportLocale } from '@portal/universal_modules/i18n'
import { useCallback, useContext } from 'react'
import { LocaleContext } from './context'
import { I18nKey, RESOURCES } from './resources'

/**
 * 現在の言語に合わせた翻訳を行うための関数を返すフック
 */
export const useTranslation = (): {
  /**
   * 翻訳を行う関数
   */
  t: (key: I18nKey, ...args: (string | number | symbol)[]) => string
  locale: Locale
} => {
  const currentLocale = useContext(LocaleContext)
  if (!isSupportLocale(currentLocale)) {
    throw new Error(`Unsupported locale: ${currentLocale}`)
  }

  const translate = useCallback(
    (q: I18nKey, ...args: (string | number | symbol)[]) => {
      try {
        const keys = q.split('.')
        let result = RESOURCES[currentLocale] as Record<string, unknown>
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
    },
    [currentLocale]
  )
  return { t: translate, locale: currentLocale }
}
