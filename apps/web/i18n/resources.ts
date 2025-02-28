import en from '@/locales/en'
import ja from '@/locales/ja'

type ValueOf<T> = T[keyof T]

type StringKey<
  T extends Record<string, unknown>,
  K extends keyof T
> = K extends string ? (T[K] extends string ? K : never) : never

type NestedStringKey<
  T extends Record<string, unknown>,
  Depth extends number = 0
> = ValueOf<{
  [K in keyof T]: K extends string
    ?
        | StringKey<T, K>
        | (T[K] extends Record<string, unknown>
            ? Depth extends 0
              ? `${K}.${NestedStringKey<T[K], 1>}`
              : Depth extends 1
                ? `${K}.${NestedStringKey<T[K], 2>}`
                : Depth extends 2
                  ? `${K}.${NestedStringKey<T[K], 3>}`
                  : Depth extends 3
                    ? `${K}.${NestedStringKey<T[K], 4>}`
                    : Depth extends 4
                      ? `${K}.${NestedStringKey<T[K], 5>}`
                      : Depth extends 5
                        ? `${K}.${NestedStringKey<T[K], 6>}`
                        : Depth extends 6
                          ? `${K}.${NestedStringKey<T[K], 7>}`
                          : Depth extends 7
                            ? `${K}.${NestedStringKey<T[K], 8>}`
                            : Depth extends 8
                              ? `${K}.${NestedStringKey<T[K], 9>}`
                              : Depth extends 9
                                ? `${K}.${NestedStringKey<T[K], 10>}`
                                : never
            : never)
    : never
}>

export const RESOURCES = { ja, en }

/**
 * i18nのキー
 */
export type I18nKey = NestedStringKey<(typeof RESOURCES)['ja']>
