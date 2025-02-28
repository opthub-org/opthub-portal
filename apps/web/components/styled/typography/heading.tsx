'use client'

import { styled } from '@mui/material'
import { Base, BaseTypographyProps } from './base'

/**
 * H1
 * @param props - Props
 */
export const H1 = (props: BaseTypographyProps) => {
  return <Base variant={'h1'} component={'h1'} {...props} />
}

/**
 * H2
 * @param props - Props
 */
export const H2 = (props: BaseTypographyProps) => {
  return <Base variant={'h2'} component={'h2'} {...props} />
}

/**
 * H3
 * @param props - Props
 */
export const H3 = (props: BaseTypographyProps) => {
  return <Base variant={'h3'} component={'h3'} {...props} />
}

/**
 * H2 With Icon
 * @param props - Props
 */
export const H2WithIcon = styled(H2)<BaseTypographyProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8
}))
