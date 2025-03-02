'use client'

import { MaybeLink } from '@/components/utils/maybe_link'
import { useTranslation } from '@/i18n/client'
import { makePath } from '@/utils/path'
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { MenuChildType } from '../../data'

/**
 * MenuChildProps
 */
export type VerticalMenuChildProps = {
  /** メニュー生成に使用するデータ */
  menuChild: MenuChildType
  /** 親リストを持つ子リストかどうか */
  nested?: true
  /** アクティブにするメニューの名前 */
  isActive?: boolean
  /** クリック時のコールバック */
  onClick?: () => void
}

/**
 * メニューの要素
 * @param props - Props
 */
export const VerticalMenuChild = ({
  menuChild,
  nested,
  isActive,
  onClick: handleClick
}: VerticalMenuChildProps) => {
  const { t, locale } = useTranslation()
  switch (menuChild.type) {
    case 'item': {
      const { icon: Icon, name, link } = menuChild
      return (
        <MaybeLink href={makePath(link, locale)}>
          <ListItemButton selected={isActive} onClick={handleClick}>
            <ListItemIcon>{Icon && <Icon />}</ListItemIcon>
            <ListItemText
              primary={t(`components.layouts.menus.${name}`)}
              primaryTypographyProps={nested ? { variant: 'body2' } : {}}
            />
          </ListItemButton>
        </MaybeLink>
      )
    }
    case 'divider': {
      const { variant } = menuChild
      return <Divider variant={variant} sx={{ marginY: 1 }} />
    }
  }
}
