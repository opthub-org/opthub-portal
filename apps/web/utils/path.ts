import { Locale } from '@portal/universal_modules/i18n'

/**
 * パスにlocaleを追加する関数
 * @param path - パス
 * @param locale - 言語
 * @param params - 検索パラメータ
 */
export const makePath = (
  path: `/${string}`,
  locale: Locale,
  params?: Record<string, string>
) => {
  const searchParams = new URLSearchParams()
  for (const key in params) {
    searchParams.set(key, params[key])
  }
  return `/${locale}${path}${params !== undefined ? `?${searchParams.toString()}` : ''}`
}
