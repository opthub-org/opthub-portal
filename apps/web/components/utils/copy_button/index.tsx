'use client'

import { useSnackbar } from '@/hooks/useSnackbar'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { IconButton, IconButtonProps } from '@mui/material'
import React from 'react'

/**
 * CopyButtonProps
 */
export type CopyButtonProps = {
  /**
   * コピーするテキスト
   */
  text: string
  /**
   * アイコンのサイズ
   */
  iconFontSize?: number
  /**
   * 子要素
   */
  children?: React.ReactNode
} & Omit<IconButtonProps, 'onClick'>

/**
 * テキストをクリップボードにコピーするボタン（ client component ）
 *
 * IOS端末かつlocalhost環境では動作しないため注意
 * https://stackoverflow.com/questions/65582701/navigator-clipboard-writetext-not-working-on-specific-ios-devices
 * @param root0 - props
 */
export const CopyButton = ({
  text,
  iconFontSize,
  children,
  ...iconButtonProps
}: CopyButtonProps) => {
  const setSnackbarMessage = useSnackbar()

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setSnackbarMessage({
        message: 'components.utils.copy_button.success'
      })
    } catch (error) {
      console.error('Failed to copy:', error)
      setSnackbarMessage({
        message: 'components.utils.copy_button.error',
        alertSeverity: 'error'
      })
    }
  }

  return (
    <IconButton {...iconButtonProps} onClick={() => copyToClipboard(text)}>
      {children ?? <ContentCopyIcon sx={{ fontSize: iconFontSize }} />}
    </IconButton>
  )
}
