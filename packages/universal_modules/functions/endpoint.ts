import { z } from 'zod'
import { Account } from '../schema'

/**
 * Functionのスキーマ
 *
 * Function名をキーとし、zodによる型付与でFunctionsの引数の型を定義する
 */
export const FunctionsRequestParser = {
  createAccount: z.object({})
}

/**
 * Functionの戻り値を定義する
 */
export interface Functions {
  /**
   * アカウントを作成する
   */
  createAccount: {
    request: z.input<(typeof FunctionsRequestParser)['createAccount']>
    parsed: z.output<(typeof FunctionsRequestParser)['createAccount']>
    response: Account
  }
}

/**
 * 関数名
 */
export type FunctionNames = keyof Functions

/**
 * 関数のリクエスト
 */
export type FunctionRequest<F extends FunctionNames> = Functions[F]['request']

/**
 * 関数のレスポンス
 */
export type FunctionResponse<F extends FunctionNames> = Functions[F]['response']

/**
 * サーバーでリクエストをパースした後の型
 */
export type FunctionParsed<F extends FunctionNames> = Functions[F]['parsed']
