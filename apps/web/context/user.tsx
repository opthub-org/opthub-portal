'use client'

import { useErrorLogger } from '@/hooks/useErrorLogger'
import { fb } from '@/lib/firebase/instance'
import { accountRef, getOrCreateCurrentUserAccount } from '@/models/account'
import { Account, Client } from '@portal/universal_modules/schema'
import { isBlank } from '@portal/universal_modules/utils'
import { User } from 'firebase/auth'
import { createContext, useEffect, useMemo } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentData } from 'react-firebase-hooks/firestore'

type UserState = {
  user: User | null | undefined
  account: Client<Account> | null | undefined
  isAuthenticated: boolean | undefined
  isAuthLoading: boolean
  isAccountLoading: boolean
}

const initialUserState: UserState = {
  user: undefined,
  isAuthenticated: undefined,
  isAuthLoading: true,
  account: undefined,
  isAccountLoading: true
}

export const UserStateContext = createContext<UserState>(initialUserState)

type Props = {
  children: React.ReactNode
}

/**
 * ユーザの状態を管理するためのContextのProvider
 * @param root0 - Props
 */
export const UserProvider = ({ children }: Props) => {
  const [user, authLoading, authError] = useAuthState(fb.auth)
  useErrorLogger(authError)
  const isAuthenticated = user !== undefined ? user !== null : undefined

  useEffect(() => {
    if (isBlank(user)) return
    getOrCreateCurrentUserAccount().catch(console.error)
  }, [user])

  const [account] = useDocumentData(user ? accountRef(user.uid) : null)
  const isAccountLoading = useMemo(() => {
    return !account
  }, [account])

  return (
    <UserStateContext.Provider
      value={{
        user,
        isAuthenticated,
        isAuthLoading: authLoading,
        account,
        isAccountLoading
      }}
    >
      {children}
    </UserStateContext.Provider>
  )
}
