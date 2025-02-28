import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES
} from '@portal/universal_modules/i18n'
import Negotiator from 'negotiator'
import { NextRequest, NextResponse } from 'next/server'

const extractLocale = (headers: Negotiator.Headers) => {
  return (
    new Negotiator({ headers }).language([...SUPPORTED_LOCALES]) ??
    DEFAULT_LOCALE
  )
}

/**
 * 言語を判定し適切なパスにリダイレクトを行う用のミドルウェア
 * @param request - NextRequest
 */
export const middleware = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname
  const searchParams = request.nextUrl.searchParams

  if (pathname.startsWith('/api/') || pathname.startsWith('/assets/')) {
    return
  }

  const pathnameIsMissingLocale = SUPPORTED_LOCALES.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Accept-Language ヘッダーから locale を取得する
  const headers = {
    'accept-language': request.headers.get('accept-language') ?? ''
  }
  const locale = extractLocale(headers)

  // ユーザのlocaleがデフォルト以外であればPrefixを追加してリダイレクト
  const searchParamsString = searchParams.toString()
  if (pathnameIsMissingLocale && locale !== DEFAULT_LOCALE) {
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname}${searchParamsString !== '' ? `?${searchParamsString}` : ''}`,
        request.url
      )
    )
  }
}

export const config = {
  matcher: ['/((?!_next).*)']
}
