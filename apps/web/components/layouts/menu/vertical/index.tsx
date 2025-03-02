'use client'

import { List } from '@mui/material'
import { MainMenuChildren, MenuName } from '../data'
import { VerticalMenuChild } from './child'

/**
 * MenuProps
 */
export type VerticalMenuProps = {
  /**
   * アクティブなメニュー
   */
  activeMenu?: MenuName

  /**
   * クリック時のコールバック
   */
  onClick?: () => void
}

/**
 * サイドバー内等に用いるメニュー
 * @param menuListProps - Props
 */
export const VerticalMenu = ({
  activeMenu,
  onClick: handleClick
}: VerticalMenuProps) => {
  return (
    <>
      <List component="nav">
        {MainMenuChildren.map((menuChild, index) => (
          <VerticalMenuChild
            menuChild={menuChild}
            isActive={
              menuChild.type === 'item' && activeMenu === menuChild.name
            }
            key={index}
            onClick={handleClick}
          />
        ))}
      </List>
    </>
  )
}
