/**
 * キーの配列とキーから値を取得する関数を受け取りマップを作る関数
 * @param keys - キーの配列
 * @param valueFunc - キーから値を取得する関数
 */
export const getMap = <K extends string, V>(
  keys: readonly K[],
  valueFunc: (key: K) => V
): Partial<Record<K, V>> => {
  const map = {} as Partial<Record<K, V>>
  for (const key of keys) {
    map[key] = valueFunc(key)
  }
  return map
}
