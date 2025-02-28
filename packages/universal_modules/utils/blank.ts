/**
 * 値を受け取り、その値が null または undefined であるかどうかをチェックする
 * @param value - チェックする値
 */
export const isBlank = (value: unknown): value is null | undefined => {
  return value === null || value === undefined
}
