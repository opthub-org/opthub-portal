'use client'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useTranslation } from '@/i18n/client'
import { makePath } from '@/utils/path'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Box, Typography } from '../../styled'

type Props = {
  children: React.ReactNode
}

/**
 * 全ページで共通の設定
 * @param props - Props
 */
export const AuthBlocker = ({ children }: Props) => {
  const { locale } = useTranslation()
  const {
    user,
    isAuthLoading: isLoading,
    account,
    isAccountLoading
  } = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return
    if (!user) router.push(makePath('/sign_in', locale))
  }, [user, isLoading, locale, router])

  if (account?.isEnabled === true) {
    return <>{children}</>
  }
  return isLoading || !user || isAccountLoading ? (
    <Box mx={'auto'} width={'100%'} textAlign={'center'}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <Typography>
        アカウントが無効です。管理者に以下のアカウントIDを伝えて、初期設定を依頼してください。
      </Typography>
      <Typography color={'red'}>{user.uid}</Typography>
    </>
  )
}
