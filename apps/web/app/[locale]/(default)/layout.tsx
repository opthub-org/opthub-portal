import { AuthBlocker } from '@/components/layouts/auth_blocker'
import { Header } from '@/components/layouts/header'
import { Sidebar } from '@/components/layouts/sidebar'
import { Box } from '@/components/styled'
import { Locale } from '@portal/universal_modules/i18n'
import type { Metadata } from 'next'

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
    <>
      <Header
        menu={{
          xs: 'hamburger',
          sm: 'hamburger',
          md: 'none',
          lg: 'none',
          xl: 'none'
        }}
      />
      <Box.Flex>
        <Sidebar
          locale={locale}
          variant="permanent"
          display={{ xs: 'none', md: 'block' }}
        />
        <Box.Main>
          <AuthBlocker>{children}</AuthBlocker>
        </Box.Main>
      </Box.Flex>
    </>
  )
}

export default Layout
