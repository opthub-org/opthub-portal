'use client'

import { DEFAULT_LOCALE } from '@portal/universal_modules/i18n'
import { createContext } from 'react'

export const LocaleContext = createContext<string>(DEFAULT_LOCALE)

type ProviderProps = {
  children: React.ReactNode
  locale: string
}

/**
 * 言語用のコンテキストプロバ
 * @param props - ProviderProps
 */
export const LocaleProvider = ({ children, locale }: ProviderProps) => {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  )
}
