import 'server-only'

import { SUPPORTED_LOCALES } from '@portal/universal_modules/i18n'

/**
 * 言語の静的パラメータを生成する関数
 */
export const generateLocaleStaticParams = () => {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}
