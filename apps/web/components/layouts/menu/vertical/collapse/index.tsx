'use client'

import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Collapse, List, ListItemButton, ListItemIcon } from '@mui/material'
import { useState } from 'react'
import { SubMenuChildren } from '../../data'
import { VerticalMenuChild } from '../child'

/**
 * メニューのトグル表示
 */
export const VerticalMenuCollapse = () => {
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{open ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{ overflow: 'hidden' }} // 開いた時に横スクロールさせないために必要
      >
        <List disablePadding>
          {SubMenuChildren.map((menuChild, index) => (
            <VerticalMenuChild menuChild={menuChild} key={index} nested />
          ))}
        </List>
      </Collapse>
    </>
  )
}
