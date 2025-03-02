'use client'

import { useTranslation } from '@/i18n/client'
import MenuIcon from '@mui/icons-material/Menu'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import { Sidebar } from '../../sidebar'

/**
 * スマホ用のサイドバー
 */
export const MobileSidebar = () => {
  const { locale } = useTranslation()
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <IconButton onClick={handleClick} sx={{ p: 0 }}>
        <MenuIcon />
      </IconButton>
      <Sidebar
        variant="temporary"
        locale={locale}
        open={open}
        onClose={handleClick}
        display="block"
      />
    </>
  )
}
