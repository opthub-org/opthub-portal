import { fb } from '@/lib/firebase/instance'
import {
  FunctionNames,
  FunctionRequest,
  FunctionResponse
} from '@portal/universal_modules/functions'
import { FirebaseError } from 'firebase/app'
import { useMemo } from 'react'
import useSWR from 'swr'

type Key<F extends FunctionNames> = [F, string]

/**
 * Cloud Functionsを利用するときのSWR
 * @param funcName - 関数名
 * @param params - 関数に渡すパラメータ
 */
export const useFunctionsSWR = <F extends FunctionNames>(
  funcName: F,
  params: FunctionRequest<F> | null
) => {
  const key = useMemo<Key<F>>(
    () => [funcName, JSON.stringify(params)] as const,
    [funcName, params]
  )
  return useSWR<FunctionResponse<F>, FirebaseError, Key<F>>(
    key,
    async ([funcName, rawParams]) => {
      const params = JSON.parse(rawParams) as FunctionRequest<F>
      const response = await fb.call<F>(funcName)(params)
      return response.data
    }
  )
}
