/**
 * 著作権表示を取得する
 * @returns © 2024 - [currentYear] OptHub Inc.
 */
export const getCopyrightNotice = () => {
  const currentYear = new Date().getFullYear()
  if (currentYear === 2024) return '© 2024 OptHub Inc.'
  return `© 2024 - ${currentYear} OptHub Inc.`
}
