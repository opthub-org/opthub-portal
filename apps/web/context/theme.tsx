'use client'
import {
  ThemeProvider as MuiThemeProvider,
  ThemeOptions,
  createTheme
} from '@mui/material/styles'
import type {} from '@mui/x-data-grid/themeAugmentation' // ThemeOptions 内で MuiDataGrid も設定可能にするために必要

export const themeOptions: ThemeOptions = {
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        /** 日本語用のフォント設定 .MuiTypography-root を付けないと反映されない */
        html[lang="ja"] .MuiTypography-root {
          font-family: "Noto Sans JP", "Arial", "Helvetica", sans-serif;
        },
        /** 英語用のフォント設定 .MuiTypography-root を付けないと反映されない */
        html[lang="en"] .MuiTypography-root {
          font-family: "Noto Sans", "Arial", "Helvetica", sans-serif;
        },
        /** next/link で生成されるaタグのデザインをリセットする */
        a {
          text-decoration: none !important;
          color: inherit;
          &:hover {
            text-decoration: none !important;
          }
        }
        /** コードブロックで半角スペースの幅を揃えるために等幅フォントを指定 */
        pre, code {
          font-family: 'Courier New', Courier, monospace;
        }
      `
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          height: 108
        }
      }
    },
    MuiStepButton: {
      styleOverrides: {
        root: {
          paddingTop: 8,
          paddingBottom: 8
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          width: '100%'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // ボタン内の英語が大文字になる設定を解除
          textTransform: 'none'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          // タブ内の英語が大文字になる設定を解除
          textTransform: 'none'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          // チップ内の英語が大文字になる設定を解除
          textTransform: 'none'
        }
      }
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          // データグリッドのフォーカス時のアウトラインを削除
          '& .MuiDataGrid-cell:focus': {
            outline: 'none'
          },
          '& .MuiDataGrid-columnHeader:focus': {
            outline: 'none'
          }
        }
      }
    }
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#2657C4'
    },
    secondary: {
      main: '#EDBF4F'
    }
  },
  typography: {
    /** デフォルトのフォント設定 */
    fontFamily: [
      '"Noto Sans JP"',
      '"Noto Sans"',
      '"Arial"',
      '"Helvetica"',
      'sans-serif'
    ].join(','),
    h1: {
      fontSize: '1.75rem',
      fontWeight: 700,
      lineHeight: 1.35 // 文字が見切れない高さを確認して設定
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.3 // 文字が見切れない高さ確認して設定
    },
    h3: {
      fontSize: '1.375rem',
      fontWeight: 700,
      lineHeight: 1.3 // 文字が見切れない高さ確認して設定
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 700,
      lineHeight: 1.3 // h3 と揃えた
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 700,
      lineHeight: 1.3 // h3 と揃えた
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 1.3 // h3 と揃えた
    },
    body1: {
      fontSize: '1rem', // 16px
      fontWeight: 400 // 標準の太さ
    },
    body2: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400 // 標準の太さ
    }
  }
}

/**
 * MUIのテーマを適用するプロバイダー
 * serverとclientのコンポーネントを分割するために切り出している
 * @param props - コンポーネントのprops
 */
export const ThemeProvider = ({
  children
}: {
  /** children */
  children: React.ReactNode
}) => {
  const theme = createTheme(themeOptions)
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
