import { useEffect } from 'react'

/**
 * エラーをコンソールに出力する
 * @param error - エラー
 */
export const useErrorLogger = (error: Error | undefined) => {
  useEffect(() => {
    if (error) console.error(error)
  }, [error])
}
