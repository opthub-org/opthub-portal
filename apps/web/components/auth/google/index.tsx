'use client'

import { GoogleIcon } from '@/components/icons/google'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useTranslation } from '@/i18n/client'
import { fb } from '@/lib/firebase/instance'
import { makePath } from '@/utils/path'
import LoadingButton from '@mui/lab/LoadingButton'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  children: React.ReactNode
}

/**
 * Google認証ボタン
 * @param root0 - Props
 */
export const GoogleOAuthButton = ({ children }: Props) => {
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false)
  const setSnackbar = useSnackbar()
  const router = useRouter()
  const { locale } = useTranslation()
  return (
    <LoadingButton
      variant="outlined"
      fullWidth
      loading={isGoogleSigningIn}
      startIcon={<GoogleIcon width={24} height={24} />}
      onClick={async () => {
        setIsGoogleSigningIn(true)
        try {
          await signInWithPopup(fb.auth, new GoogleAuthProvider())
          setSnackbar({
            message: `components.auth.oauth.successfully_sign_in`
          })
          router.push(makePath('/', locale))
        } catch (error) {
          console.error(error)
          setSnackbar({
            message: `components.auth.oauth.unexpected_error`,
            alertSeverity: 'error'
          })
          setIsGoogleSigningIn(false)
        }
      }}
    >
      {children}
    </LoadingButton>
  )
}
