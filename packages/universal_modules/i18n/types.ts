/**
 * 対応言語
 */
export const SUPPORTED_LOCALES = ['ja', 'en'] as const

/**
 * 標準の言語
 */
export const DEFAULT_LOCALE = 'en'

/**
 * 利用可能な言語
 */
export type Locale = (typeof SUPPORTED_LOCALES)[number]

/**
 * 型Tのローカライズ
 * 各言語に対応する値は任意
 */
export type Localized<T> = {
  [K in Locale]?: T
}

/**
 * 型Tのローカライズ
 * 各言語に対応する値が必須
 */
export type RequiredLocalized<T> = Required<Localized<T>>

/**
 * 特定の言語がサポートされているかどうか
 * @param locale - 判定する対象の言語
 */
export const isSupportLocale = (
  locale: string | undefined
): locale is Locale => {
  for (const supportedLocale of SUPPORTED_LOCALES) {
    if (supportedLocale === locale) {
      return true
    }
  }
  return false
}
