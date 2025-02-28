import Box, { BoxProps } from '@mui/material/Box'
import { BoxTypeMap } from '@mui/system'
import React from 'react'

/**
 * Base Box
 */
export type BaseBoxProps<
  RootComponent extends React.ElementType = BoxTypeMap['defaultComponent'],
  AdditionalProps = Record<string, unknown>
> = BoxProps<RootComponent, AdditionalProps>

/**
 * Base Box
 * @param root0 - Props
 */
export const Base = Box
