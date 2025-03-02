'use client'

import { MenuItem } from '@/components/styled'
import Box from '@/components/styled/box'
import { useTranslation } from '@/i18n/client'
import { makePath } from '@/utils/path'
import { Language } from '@mui/icons-material'
import { Button, ButtonProps, Menu } from '@mui/material'
import { Locale, SUPPORTED_LOCALES } from '@portal/universal_modules/i18n'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

/**
 * LanguageSelectorProps
 */
export type LanguageSelectorProps = {
  /**
   * 言語
   */
  locale: Locale
} & Omit<ButtonProps, 'onClick'>

/**
 * コンペ、指標、問題のどれを作成するか選択するボタン
 * @param root0 - props
 */
const LanguageSelectorImpl = ({
  locale,
  ...buttonProps
}: LanguageSelectorProps) => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  /** currentPathname は必ず / で始まるため、as `/${string}` で型アサーションしている */
  const currentPathname = usePathname() as `/${string}`
  const currentSearchParams = useSearchParams().toString()

  const currentFullPathnameWithoutLocale =
    `${currentPathname}?${currentSearchParams}`.replace(
      `/${locale}`,
      `/`
    ) as `/${string}`

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Button {...buttonProps} onClick={handleClick} color="inherit">
        <Language sx={{ marginRight: 0.5 }} />
        <Box display={{ xs: 'none', sm: 'block' }}>
          {t(`locales.${locale}`)}
        </Box>
        <Box display={{ xs: 'block', sm: 'none' }}>
          {t(`locale_codes.${locale}`)}
        </Box>
      </Button>
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
        {SUPPORTED_LOCALES.map((supportedLocale) => {
          return (
            <MenuItem.Shorthand
              key={supportedLocale}
              text={t(`locales.${supportedLocale}`)}
              href={makePath(currentFullPathnameWithoutLocale, supportedLocale)}
            />
          )
        })}
      </Menu>
    </>
  )
}

/**
 * LanguageSelectorProps
 * @param props - LanguageSelectorProps
 */
export const LanguageSelector = (props: LanguageSelectorProps) => {
  return (
    <Suspense>
      <LanguageSelectorImpl {...props} />
    </Suspense>
  )
}
