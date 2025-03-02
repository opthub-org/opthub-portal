import { AccessAlarm, Home, Settings } from '@mui/icons-material'
import { SvgIconProps } from '@mui/material'

/** メニュー名 */
export type MenuName = 'home' | 'setting' | 'attendance'

/** メニュー生成に使用するデータ */
export type MenuChildType =
  | {
      /** メニューを表示する要素であることを示す */
      type: 'item'
      /** メニューに表示するアイコン */
      icon?: React.ComponentType<SvgIconProps>
      /** メニュー名 */
      name: MenuName
      /** メニューのリンク */
      link: `/${string}`
    }
  | {
      /** 区切り線を表示する要素であることを示す */
      type: 'divider'
      /** 区切り線のオプション */
      variant: 'fullWidth' | 'inset' | 'middle'
    }

export const MainMenuChildren: MenuChildType[] = [
  {
    type: 'item',
    icon: Home,
    name: 'home',
    link: '/'
  },
  {
    type: 'item',
    icon: AccessAlarm,
    name: 'attendance',
    link: '/attendance'
  },
  {
    type: 'item',
    icon: Settings,
    name: 'setting',
    link: '/setting'
  }
]

export const SubMenuChildren: MenuChildType[] = []
