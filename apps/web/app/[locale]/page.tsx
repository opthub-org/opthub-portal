'use client'

import { GoogleOAuthButton } from '@/components/auth/google'
import Typography from '@/components/styled/typography'
import { Image } from '@/components/utils/image'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { makePath } from '@/utils/path'
import { CircularProgress, Link, Stack } from '@mui/material'
import { Box, Container } from '@mui/system'
import { Locale } from '@portal/universal_modules/i18n'
import NextLink from 'next/link'

type Props = {
  params: { locale: Locale }
}

/**
 * 認証ページのレイアウト
 * @param props - コンポーネントのprops
 */
const Page = ({ params: { locale } }: Props) => {
  const { user, isAuthLoading: isLoading, account } = useCurrentUser()
  return (
    <Container maxWidth="md" sx={{ mb: 5 }}>
      <Box mt={5} mb={3}>
        <NextLink href={makePath('/', locale)}>
          <Image
            src="/assets/images/logo.svg"
            alt="OptHub"
            height={95 * 0.37}
            width={429 * 0.37}
            skeleton="disabled"
          />
        </NextLink>
      </Box>
      {isLoading ? (
        <CircularProgress />
      ) : !user ? (
        <>
          <Typography mb={2}>
            本ページは関係者専用のページです。利用するにはログインをしてください。
          </Typography>
          <Box>
            <GoogleOAuthButton>Googleでログイン</GoogleOAuthButton>
          </Box>
        </>
      ) : account?.isEnabled === true ? (
        <Stack spacing={2}>
          <Link component={NextLink} href={makePath('/attendance', locale)}>
            勤怠管理
          </Link>
        </Stack>
      ) : (
        <>
          <Typography>
            アカウントが無効です。管理者に以下のアカウントIDを伝えて,
            初期設定を依頼してください。
          </Typography>
          <Typography>アカウントID: {user.uid}</Typography>
        </>
      )}
    </Container>
  )
}

export default Page
