/**
 * 配列やオブジェクトまで含めてデータをシリアライズする関数
 * @param value - シリアライズするデータ
 * @param replacer - 値の書き換え関数
 */
export const convert = (
  value: unknown,
  replacer: (value: unknown) => unknown
): unknown => {
  const replaced = replacer(value)
  if (replaced !== value) {
    return replaced
  } else if (typeof value !== 'object' || value === null) {
    return value
  } else if (Array.isArray(value)) {
    return value.map((v) => convert(v, replacer))
  } else {
    const serialized: Record<string, unknown> = {}
    for (const key in value) {
      serialized[key] = convert(
        (value as Record<string, unknown>)[key],
        replacer
      )
    }
    return serialized
  }
}
