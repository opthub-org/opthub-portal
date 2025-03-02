'use client'

import { MenuItem } from '@/components/styled'
import Avatar from '@/components/styled/avatar'
import Box from '@/components/styled/box'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useTranslation } from '@/i18n/client'
import { fb } from '@/lib/firebase/instance'
import { ArrowDropDown, Logout } from '@mui/icons-material'
import { Menu } from '@mui/material'
import { signOut } from 'firebase/auth'
import { useState } from 'react'

/**
 * ヘッダー内のアバターとアバターをクリックした際に表示されるメニュー
 */
export const AvatarMenu = () => {
  const { t } = useTranslation()
  const { user } = useCurrentUser()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Box.Centered sx={{ cursor: 'pointer' }} onClick={handleClick}>
        <Avatar size={32} />
        <ArrowDropDown />
      </Box.Centered>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {user && (
          <MenuItem.Shorthand
            color="error.main"
            icon={Logout}
            onClick={() => signOut(fb.auth)}
            text={t('components.layouts.header.avatar_menu.sign_out')}
          />
        )}
      </Menu>
    </>
  )
}
