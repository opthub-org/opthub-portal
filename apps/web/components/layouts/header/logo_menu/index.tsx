import { Box } from '@/components/styled'
import { Image } from '@/components/utils/image'
import { makePath } from '@/utils/path'
import { Breakpoint } from '@mui/system'
import { Locale } from '@portal/universal_modules/i18n'
import Link from 'next/link'
import { MobileSidebar } from '../mobile_sidebar'

type DisplayState = {
  [key in Breakpoint]?: 'flex' | 'none'
}

type MenuType = 'hamburger' | 'none'

/**
 * Menuの表示状態を定義する型
 */
export type Menu = { [key in Breakpoint]?: MenuType }

type GenerateMenuDisplayProps = {
  menu: Menu
  menuType: MenuType
}

/**
 * Menuの表示状態を生成する関数
 *
 * 各MenuTypeに対応するDisplayStateを生成する。
 * いずれかの MenuType が表示されている時は 'flex' に、それ以外は 'none' になる。
 * @param props - Props
 * @returns 各Breakpointに対応するDisplayState
 */
const generateMenuDisplay = ({
  menu,
  menuType
}: GenerateMenuDisplayProps): DisplayState => {
  const breakPoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl']
  return breakPoints.reduce((acc: DisplayState, key: Breakpoint) => {
    acc[key] = menu[key] === menuType ? 'flex' : 'none'
    return acc
  }, {})
}

/**
 * LogoMenuProps
 */
export type LogoMenuProps = {
  /**
   * メニュー
   */
  menu: Menu
  /**
   * 言語
   */
  locale: Locale
}

/**
 * レスポンシブメニュー
 * @param root0 - props
 */
export const LogoMenu = ({ menu, locale }: LogoMenuProps) => {
  const menuDisplay = {
    hamburger: generateMenuDisplay({ menu, menuType: 'hamburger' })
  }

  return (
    <Box.Centered gap={1} display={menuDisplay.hamburger} my={2}>
      <MobileSidebar />
      <Link href={makePath('/', locale)}>
        <Image
          src="/assets/images/logo.svg"
          alt="OptHub Portal"
          height={95 * 0.37} // Sidebarの指定を参考に倍率のみ感覚で調整した
          width={429 * 0.37} // Sidebarの指定を参考に倍率のみ感覚で調整した
          skeleton="disabled"
        />
      </Link>
    </Box.Centered>
  )
}
