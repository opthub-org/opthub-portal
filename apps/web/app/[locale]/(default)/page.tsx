'use client'

import { Locale } from '@portal/universal_modules/i18n'

type Props = {
  params: { locale: Locale }
}

/**
 * 認証ページのレイアウト
 * @param props - コンポーネントのprops
 */
const Page = ({ params: { locale } }: Props) => {
  return <>Home</>
}

export default Page
