import { SnackbarProvider } from '@/context/snackbar'
import { UserProvider } from '@/context/user'
import { LocaleProvider } from '@/i18n/context'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { Locale } from '@portal/universal_modules/i18n'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OptHub Portal'
}

type LayoutProps = Readonly<{
  children: React.ReactNode
  params: { locale: Locale }
}>

/**
 * 言語の配下の全ページで共通の設定
 * @param props - Props
 */
const Layout = ({ children, params: { locale } }: LayoutProps) => {
  return (
    <html lang={locale}>
      <AppRouterCacheProvider>
        <body className={inter.className}>
          <LocaleProvider locale={locale}>
            <UserProvider>
              <SnackbarProvider>{children}</SnackbarProvider>
            </UserProvider>
          </LocaleProvider>
        </body>
      </AppRouterCacheProvider>
    </html>
  )
}

export default Layout
