/**
 * URLからドメイン部分のみを抽出して返す関数
 * @param url - 処理対象のURL文字列
 * @returns ドメイン部分の文字列（例：'example.com'）
 */
export const getDomain = (url: string) => {
  // スキーム、パス、クエリパラメータ、ポート番号を除去してドメインのみを抽出
  return url
    .replace(/^(https?|ftp):\/\//, '') // スキームを除去
    .replace(/\/.*$/, '') // パス以降を除去
    .replace(/\?.*$/, '') // クエリパラメータを除去
    .replace(/:[0-9]+$/, '') // ポート番号を除去
}
