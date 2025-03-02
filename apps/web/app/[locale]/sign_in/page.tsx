'use client'

import { GoogleOAuthButton } from '@/components/auth/google'
import { Box, Typography } from '@/components/styled'
import { Image } from '@/components/utils/image'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { makePath } from '@/utils/path'
import { CircularProgress, Container } from '@mui/material'
import { Locale } from '@portal/universal_modules/i18n'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type Props = {
  params: { locale: Locale }
}

/**
 * 認証ページのレイアウト
 * @param props - コンポーネントのprops
 */
const Page = ({ params: { locale } }: Props) => {
  const { user, isAuthLoading } = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push(makePath('/', locale))
    }
  }, [user])

  if (isAuthLoading || user)
    return (
      <Box mx={'auto'} width={'100%'} textAlign={'center'}>
        <CircularProgress />
      </Box>
    )
  return (
    <Container component={Box} maxWidth="md" py={2}>
      <Image
        src="/assets/images/logo.svg"
        alt="OptHub Portal"
        height={95 * 0.37} // Sidebarの指定を参考に倍率のみ感覚で調整した
        width={429 * 0.37} // Sidebarの指定を参考に倍率のみ感覚で調整した
        skeleton="disabled"
      />
      <Box my={1}>
        <Typography>
          本ページは関係者専用のページです。利用するにはログインをしてください。
        </Typography>
        <Box mt={1}>
          <GoogleOAuthButton>Googleでログイン</GoogleOAuthButton>
        </Box>
      </Box>
    </Container>
  )
}

export default Page
