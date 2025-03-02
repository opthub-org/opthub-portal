import { ThemeProvider } from '@/context/theme'
import { CssBaseline } from '@mui/material'
import type { Metadata } from 'next'

import '@fontsource/noto-sans-jp/400.css' // 通常のウェイト
import '@fontsource/noto-sans-jp/700.css' // 太字
import '@fontsource/noto-sans/400.css' // 通常のウェイト
import '@fontsource/noto-sans/700.css' // 太字

export const dynamicParams = false

export const metadata: Metadata = {
  title: 'OptHub Portal'
}

type LayoutProps = Readonly<{
  children: React.ReactNode
}>

/**
 * 全ページで共通の設定
 * @param props - Props
 */
const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default Layout
