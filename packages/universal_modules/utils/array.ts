import { isBlank } from './blank'

/**
 * 配列を分割する
 * @param arr - 分割する配列
 * @param chunkSize - 分割するサイズ
 */
export const chunkArray = <T>(arr: T[], chunkSize: number): T[][] => {
  const subArrayCount = Math.ceil(arr.length / chunkSize)
  const result = new Array<T[]>(subArrayCount)
  for (let i = 0; i < subArrayCount; i++) {
    const start = i * chunkSize
    const end = start + chunkSize
    result[i] = arr.slice(start, end)
  }
  return result
}

/**
 * 配列からnullとundefinedを削除する
 * @param arr - 配列
 */
export const removeBlankElements = <T>(arr: (T | undefined | null)[]): T[] => {
  return arr.filter((v): v is T => !isBlank(v))
}
