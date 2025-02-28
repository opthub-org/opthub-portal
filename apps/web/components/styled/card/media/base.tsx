'use client'

import { styled } from '@mui/material'
import _CardMedia, { CardMediaProps } from '@mui/material/CardMedia'

const CardMedia = styled(_CardMedia)(() => ({
  height: '100%'
}))

/**
 * Base CardMedia
 */
export type BaseCardMediaProps = CardMediaProps

/**
 * Base CardMedia
 * @param root0 - Props
 */
export const Base = ({ ...props }: BaseCardMediaProps) => (
  <CardMedia
    component="img"
    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      // src属性に指定した画像のURLが404エラー等で取得できない場合、no photo用の画像を表示させる
      e.currentTarget.onerror = null // 下記画像が取得できない場合の無限ループを防ぐため、nullを代入
      e.currentTarget.src = '/assets/images/default_thumbnail.png'
    }}
    {...props}
  />
)
