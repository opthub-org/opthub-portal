'use client'

import { LanguageSelector } from '@/components/layouts/header/language_selector'
import { Box } from '@/components/styled'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useTranslation } from '@/i18n/client'
import { MAIN_BOX_PADDING_X } from '@/variables'
import { Divider } from '@mui/material'
import { Stack } from '@mui/system'
import { AvatarMenu } from './avatar_menu'
import { LogoMenu, Menu } from './logo_menu'

/**
 * HeaderProps
 */
export type HeaderProps = {
  /**
   * 最大の横幅
   */
  contentMaxWidth?: string | number
  /**
   * メニュー
   */
  menu: Menu
}

/**
 * ヘッダー
 * @param root0 - Props
 */
export const Header = ({ contentMaxWidth, menu }: HeaderProps) => {
  const { user } = useCurrentUser()
  const { locale } = useTranslation()

  return (
    // サイドバーとの重なりの調整に手間がかかるため、AppBarやToolbarは用いない方針
    // ヘッダーのみで使用する調整のため各種オプションでの指定を許容する
    <>
      <Box
        position="fixed"
        width="100%"
        bgcolor="inherit"
        zIndex={1100} // app barのz-indexを指定
      >
        <Stack
          height={50}
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="between"
          width="100%"
          component="nav"
          mx={'auto'}
          maxWidth={contentMaxWidth}
          paddingX={MAIN_BOX_PADDING_X}
        >
          {/* 横幅が md 以上で左側のメニューが none でも右側のメニューを右側に配置させるために必要なBox */}
          <Box flexGrow={1}>
            <LogoMenu menu={menu} locale={locale} />
          </Box>
          <Box.Centered flexShrink={0} gap={1}>
            <LanguageSelector locale={locale} />
            <AvatarMenu />
          </Box.Centered>
        </Stack>
        <Divider />
      </Box>
      <Box height={50} width="100%" />
    </>
  )
}
