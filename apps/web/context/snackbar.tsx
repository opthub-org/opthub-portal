'use client'

import { useTranslation } from '@/i18n/client'
import { I18nKey } from '@/i18n/resources'
import { Alert, AlertColor, Snackbar } from '@mui/material'
import { createContext, useState } from 'react'

type SnackbarContent = (
  | {
      message: I18nKey
      i18n?: true
    }
  | {
      i18n: false
      message: string
    }
) & {
  vertical?: 'top' | 'bottom'
  horizontal?: 'left' | 'center' | 'right'
  alertSeverity?: AlertColor
  alertVariant?: 'filled' | 'standard' | 'outlined'
}

export const SnackbarContext = createContext<(msg: SnackbarContent) => void>(
  () => {
    throw new Error('Not initialized')
  }
)

type SnackbarProviderProps = {
  children: React.ReactNode
}

/**
 * Snackbarに表示する内容を制御するProvider
 * @param root0 - SnackbarProviderProps
 */
export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [content, setContent] = useState<SnackbarContent | undefined>()
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  return (
    <SnackbarContext.Provider
      value={(content) => {
        setContent(content)
        setOpen(true)
      }}
    >
      {content && (
        <Snackbar
          open={open}
          anchorOrigin={{
            vertical: content.vertical ?? 'bottom',
            horizontal: content.horizontal ?? 'right'
          }}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={content.alertSeverity ?? 'success'}
            variant={content.alertVariant ?? 'filled'}
            sx={{ width: '100%' }}
          >
            {content.i18n === false ? content.message : t(content.message)}
          </Alert>
        </Snackbar>
      )}
      {children}
    </SnackbarContext.Provider>
  )
}
