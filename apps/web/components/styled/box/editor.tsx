'use client'

import { styled } from '@mui/material'
import { Base } from './base'
import { getMarkdownStyles } from './markdown'

export const Editor = styled(Base)(({ theme }) => {
  return {
    // プレビューの設定
    '& .editor-preview': getMarkdownStyles(theme),

    // エディタの設定
    '& .CodeMirror': {
      fontFamily: theme.typography.fontFamily
    },
    // 見出し
    '& .cm-s-easymde .cm-header-1': {
      ...theme.typography.h3
    },
    '& .cm-s-easymde .cm-header-2': theme.typography.h4,
    '& .cm-s-easymde .cm-header-3': theme.typography.h5,
    '& .cm-s-easymde .cm-header-4': theme.typography.h5,
    '& .cm-s-easymde .cm-header-5': theme.typography.h5,
    '& .cm-s-easymde .cm-header-6': theme.typography.h5,

    // 引用
    '& .cm-s-easymde .cm-quote': {
      color: '#555555'
    },

    // 画像
    '& .cm-s-easymde .cm-image': {
      color: theme.palette.primary.main
    },
    '& .cm-s-easymde .cm-url': {
      color: theme.palette.primary.main
    },

    // リンク
    '& .cm-s-easymde .cm-link': {
      color: theme.palette.primary.main
    }
  }
})
