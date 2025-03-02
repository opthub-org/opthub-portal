'use client'

import Box from '@/components/styled/box'
import { Image } from '@/components/utils/image'
import { makePath } from '@/utils/path'
import Drawer, { DrawerProps } from '@mui/material/Drawer' // '@mui/material'からインポートするとStoryBookでエラーが出る
import { BoxProps } from '@mui/system'
import { Locale } from '@portal/universal_modules/i18n'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { MenuName } from '../menu/data'
import { VerticalMenu } from '../menu/vertical'

/**
 * SidebarのProps
 */
export type SidebarProps = {
  /**
   * 言語
   */
  locale: Locale

  /**
   * レスポンシブ対応の display
   */
  display: BoxProps['display']

  /**
   * 閉じる時のコールバック
   */
  onClose?: () => void
} & Omit<DrawerProps, 'onClose'>

/**
 * サイドバー
 * @param root0 - Props
 */
export const Sidebar = ({
  locale,
  variant,
  display,
  onClose: handleClose,
  ...drawerProps
}: SidebarProps) => {
  const sx = { ...drawerProps.sx, display }
  const path = usePathname()
  const activeMenu = useMemo<MenuName | undefined>(() => {
    const menu = path.split('/').filter(Boolean)[1]
    if (menu === undefined) return 'home'
    switch (menu) {
      case 'setting':
        return 'setting'
      case 'attendance':
        return 'attendance'
      default:
        return 'home'
    }
  }, [path])
  return (
    <>
      {/* 左端に固定するのに便利なので Drawer を使用 */}
      <Drawer onClose={handleClose} variant={variant} {...drawerProps} sx={sx}>
        <Box width={240}>
          <Box pl={2} mt={2} mb={1}>
            <Link href={makePath('/', locale)}>
              <Image
                src="/assets/images/logo.svg"
                alt="OptHub Portal"
                height={172 * 0.22}
                width={798 * 0.22}
                skeleton="disabled"
              />
            </Link>
          </Box>
          <VerticalMenu onClick={handleClose} activeMenu={activeMenu} />
        </Box>
      </Drawer>
      {variant === 'permanent' && (
        <Box minWidth={240} height="100%" display={display} />
      )}
    </>
  )
}
