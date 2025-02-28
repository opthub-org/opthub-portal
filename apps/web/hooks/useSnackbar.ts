'use client'

import { SnackbarContext } from '@/context/snackbar'
import { useContext } from 'react'

/**
 * Snackbarを表示するためのフック
 */
export const useSnackbar = () => {
  return useContext(SnackbarContext)
}
