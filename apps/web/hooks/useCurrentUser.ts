'use client'

import { UserStateContext } from '@/context/user'
import { useContext } from 'react'

/**
 * 現在のユーザの状態を利用するためのフック
 */
export const useCurrentUser = () => useContext(UserStateContext)
