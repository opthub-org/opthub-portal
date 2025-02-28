import { Locale, Localized, SUPPORTED_LOCALES } from '../i18n/types'
import { getMap } from '../utils/map'

/**
 * keyをLocale、valueにそれぞれの言語に対応する値を設定する関数
 * @param func - localeに対応する値を返す関数
 */
export const getLocalizedMap = <T>(func: (locale: Locale) => T) => {
  return getMap(SUPPORTED_LOCALES, func) as Record<Locale, T>
}

/**
 * ローカライズされたフィールドを表示する際に使用する
 * @param field - ローカライズされたフィールド
 * @param locale - 表示する言語
 * @param fallback - フィールドに指定された言語が存在しない場合のフォールバック言語
 */
export const getLocalizedText = (
  field: Localized<string>,
  locale: Locale,
  fallback: Locale
) => {
  if (field[locale] !== undefined && field[locale] !== '')
    return field[locale] ?? ''
  return field[fallback] ?? ''
}
