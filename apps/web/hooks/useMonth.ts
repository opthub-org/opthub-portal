/**
 * 日付が属する月の開始日と終了日を取得する
 * @param date - 日付
 */
export const useMonth = (date: Date) => {
  const start = new Date(date.getFullYear(), date.getMonth())
  const end = new Date(date.getFullYear(), date.getMonth() + 1)
  return { start, end }
}
