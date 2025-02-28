'use client'

import { Theme, styled } from '@mui/material'
import { Base, BaseBoxProps } from './base'

/**
 * Markdown用のスタイルを取得する
 * @param theme - Theme
 */
export const getMarkdownStyles = (theme: Theme) => {
  /** 共通のスタイル */
  const commonStyles = {
    marginBottom: '0.35em'
  }
  return {
    ...theme.typography,
    fontSize: '1rem', // body1 と同じフォントサイズ
    h3: {
      ...theme.typography.h3,
      ...commonStyles,
      marginTop: '2rem',
      '& + h4, & + h5, & + h6': {
        marginTop: '1rem'
      }
    },
    h4: {
      ...theme.typography.h4,
      ...commonStyles,
      marginTop: '2rem',
      '& + h5, & + h6': {
        marginTop: '0.75rem'
      }
    },
    h5: {
      ...theme.typography.h5,
      ...commonStyles,
      marginTop: '1.5rem',
      '& + h5, & + h6': {
        marginTop: '0.5rem'
      }
    },
    h6: {
      ...theme.typography.h6,
      ...commonStyles,
      marginTop: '1.25rem'
    },
    p: {
      // letterSpacing: '0.075em'
    },
    a: {
      color: theme.palette.primary.main
    },
    // 段落とテキスト要素
    blockquote: {
      letterSpacing: '0.075em',
      lineHeight: 1.85,
      color: '#555555',
      fontStyle: 'normal',
      margin: '1.5rem 0 0',
      marginTop: '1.5rem',
      padding: '0.5rem 0 0.5rem 0.5rem',
      background: '#f3f3f3',
      borderLeft: 'solid 0.4rem #cccccc',
      '& blockquote': {
        margin: '0.5rem 0 0.5rem 0.25rem'
      },
      '& p': {
        margin: 0
      }
    },
    ol: {
      letterSpacing: '0.075em',
      lineHeight: 1.85,
      position: 'relative',
      marginTop: '1rem',
      padding: 0,
      listStyle: 'none',
      counterReset: 'list',
      '& li': {
        margin: '0.25em 0',
        position: 'relative',
        counterIncrement: 'list',
        '&::before': {
          position: 'absolute',
          left: 0
        },
        '& p': {
          margin: 0
        },
        '& ol, & ul': {
          margin: 0,
          paddingLeft: 0
        }
      },
      '& > li': {
        paddingLeft: '2.1em',
        '&::before': {
          content: 'counter(list) "."',
          display: 'inline-block',
          paddingRight: '0.4rem',
          textAlign: 'right',
          width: '2.1em'
        },
        '& > ol > li': {
          paddingLeft: '2em !important',
          '&::before': {
            width: '2em !important'
          }
        }
      }
    },
    ul: {
      letterSpacing: '0.075em',
      lineHeight: 1.85,
      position: 'relative',
      marginTop: '1rem',
      padding: 0,
      listStyle: 'none',
      '& li': {
        margin: '0.25em 0',
        position: 'relative',
        '&::before': {
          position: 'absolute',
          left: 0,
          content: '"・"',
          width: '1em'
        },
        '& p': {
          margin: 0
        },
        '& ol, & ul': {
          margin: 0,
          paddingLeft: 0
        }
      },
      '& > li': {
        paddingLeft: '1em'
      }
    },
    // 画像
    img: {
      display: 'block',
      margin: '1.5rem auto 0',
      height: 'auto' /* アスペクト比を保持して高さを自動調整 */,
      maxWidth: '100%' /* 画像の幅が親要素の幅を超えないようにする */,
      maxHeight: '100%' /* 画像の高さが親要素の高さを超えないようにする */
    },
    // テーブル
    '.table-container': {
      overflow: 'auto',
      whiteSpace: 'nowrap',
      margin: '1rem 0',
      table: {
        textWrap: 'nowrap',
        borderCollapse: 'collapse',
        '& tr:nth-child(even)': {
          backgroundColor: 'rgba(0, 0, 0, 0.05)'
        },
        '& th, & td': {
          border: '1px solid #ccc',
          padding: '0.5rem',
          textAlign: 'center'
        },
        '& th': {
          fontWeight: 500,
          backgroundColor: '#262626',
          color: '#cccccc'
        },
        '& [align="right"]': {
          textAlign: 'right'
        },
        '& [align="left"]': {
          textAlign: 'left'
        },
        '& [align="center"]': {
          textAlign: 'center'
        }
      }
    }
  } as const
}

export const Markdown: React.FC<BaseBoxProps> = styled(Base)<BaseBoxProps>(
  ({ theme }) => getMarkdownStyles(theme)
)
