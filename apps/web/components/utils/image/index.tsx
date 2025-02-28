'use client'

import { Box } from '@/components/styled'
import { Skeleton } from '@mui/material'
// eslint-disable-next-line no-restricted-imports
import NextImage from 'next/image'
import React, { useEffect, useState } from 'react'

/**
 * ImageProps
 */
export type ImageProps = React.ComponentProps<typeof NextImage> & {
  /**
   * フォールバック画像
   */
  fallbackImage?: string
  /**
   * エラー時のコールバック
   */
  skeleton?: 'enabled' | 'disabled'
}

/**
 * NextImage の拡張
 * @param props - props
 */
export const Image = ({
  src,
  fallbackImage,
  onError: _handleError,
  onLoad: handleLoad,
  skeleton = 'enabled',
  ...props
}: ImageProps) => {
  const [fallback, setFallback] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setFallback(false)
  }, [src])

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (_handleError) _handleError(e)
    if (fallbackImage !== undefined) setFallback(true)
  }

  return (
    // NextImage が読み込み中の場合にスケルトンを表示する。
    // display: none にすると NextImage が読み込まれないため、
    // visibility: hidden と position: absolute で対応。
    <Box
      position="relative"
      flexShrink={0}
      width={props.width ?? '100%'}
      height={props.height ?? '100%'}
    >
      {skeleton === 'enabled' && loading && (
        <Skeleton
          variant="rectangular"
          width={props.width}
          height={props.height}
          sx={{ position: 'absolute' }}
        />
      )}
      <NextImage
        style={{
          visibility: loading ? 'hidden' : 'visible',
          position: 'absolute'
        }}
        onLoad={(e) => {
          if (handleLoad) handleLoad(e)
          setLoading(false)
        }}
        src={fallback && fallbackImage !== undefined ? fallbackImage : src}
        onError={handleError}
        {...props}
      />
    </Box>
  )
}
