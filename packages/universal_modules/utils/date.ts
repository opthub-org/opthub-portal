import { z } from 'zod'

/**
 * YYYY-MM-DD
 */
export type YYYYMMDD = `${string}-${string}-${string}`

export const dateRangeZod = z.union([
  z.literal('today'),
  z.literal('yesterday'),
  z.literal('2days_ago'),
  z.literal('recent_1days'),
  z.literal('recent_7days'),
  z.literal('recent_14days'),
  z.literal('recent_28days'),
  z.literal('recent_30days'),
  z.literal('this_week'),
  z.literal('last_week'),
  z.literal('this_month'),
  z.literal('last_month'),
  z.literal('this_year'),
  z.literal('last_year'),
  z.object({
    startDate: z.union([z.string(), z.date()]),
    endDate: z.union([z.string(), z.date()])
  })
])

/**
 * データの期間の型
 */
export type DateRange = z.output<typeof dateRangeZod>

/**
 * 標準化されたデータの期間
 */
export type NormalizedDateRange = {
  /**
   * 開始日
   */
  startDate: YYYYMMDD
  /**
   * 終了日
   */
  endDate: YYYYMMDD
}

/**
 * 日付をYYYY-MM-DD形式で取得する
 * @param date - 日付
 */
export const getYYYYMMDD = (date: Date): YYYYMMDD => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * 週の初めを取得する関数
 * @param date - 日付
 */
export const getStartOfWeek = (date?: Date): Date => {
  const d = date ?? new Date()
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is Sunday
  return new Date(d.setDate(diff))
}

/**
 * 月の初めを取得する関数
 * @param date - 日付
 */
export const getStartOfMonth = (date?: Date): Date => {
  const d = date ?? new Date()
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

/**
 * 過去○日の基準日を取得する関数
 * 今日のデータや昨日のデータは出ていない場合があるので、その場合は一昨日が基準になる場合がある
 */
export const getBaseDate = () => {
  const date = new Date()
  // TODO: 現状は昨日をハードコードしているため、昨日のデータが存在しない場合を考慮できていない
  date.setDate(date.getDate() - 1)
  return date
}

/**
 * 年の初めを取得する関数
 * @param date - 日付
 */
export const getStartOfYear = (date?: Date): Date => {
  const d = date ?? new Date()
  return new Date(d.getFullYear(), 0, 1)
}

/**
 * 与えられた日付の範囲指定を正規化する関数
 * @param dateRange - 日付の範囲指定
 */
export const normalizeDateRange = (
  dateRange: DateRange
): NormalizedDateRange => {
  const today = new Date()
  const baseDate = getBaseDate()

  switch (dateRange) {
    case 'today':
      return { startDate: getYYYYMMDD(today), endDate: getYYYYMMDD(today) }
    case 'yesterday': {
      const yesterday = new Date(today)
      yesterday.setDate(today.getDate() - 1)
      return {
        startDate: getYYYYMMDD(yesterday),
        endDate: getYYYYMMDD(yesterday)
      }
    }
    case '2days_ago': {
      const twoDaysAgo = new Date(today)
      twoDaysAgo.setDate(today.getDate() - 2)
      return {
        startDate: getYYYYMMDD(twoDaysAgo),
        endDate: getYYYYMMDD(twoDaysAgo)
      }
    }
    case 'recent_1days': {
      return {
        startDate: getYYYYMMDD(baseDate),
        endDate: getYYYYMMDD(baseDate)
      }
    }
    case 'recent_7days': {
      const sevenDaysAgoFromBase = new Date(baseDate)
      sevenDaysAgoFromBase.setDate(baseDate.getDate() - 6)
      return {
        startDate: getYYYYMMDD(sevenDaysAgoFromBase),
        endDate: getYYYYMMDD(baseDate)
      }
    }
    case 'recent_14days': {
      const fourteenDaysAgoFromBase = new Date(baseDate)
      fourteenDaysAgoFromBase.setDate(baseDate.getDate() - 13)
      return {
        startDate: getYYYYMMDD(fourteenDaysAgoFromBase),
        endDate: getYYYYMMDD(baseDate)
      }
    }
    case 'recent_28days': {
      const twentyEightDaysAgoFromBase = new Date(baseDate)
      twentyEightDaysAgoFromBase.setDate(baseDate.getDate() - 27)
      return {
        startDate: getYYYYMMDD(twentyEightDaysAgoFromBase),
        endDate: getYYYYMMDD(baseDate)
      }
    }
    case 'recent_30days': {
      const thirtyDaysAgoFromBase = new Date(baseDate)
      thirtyDaysAgoFromBase.setDate(baseDate.getDate() - 29)
      return {
        startDate: getYYYYMMDD(thirtyDaysAgoFromBase),
        endDate: getYYYYMMDD(baseDate)
      }
    }
    case 'this_week': {
      const startOfThisWeek = getStartOfWeek(new Date(today))
      return {
        startDate: getYYYYMMDD(startOfThisWeek),
        endDate: getYYYYMMDD(today)
      }
    }
    case 'last_week': {
      const startOfLastWeek = getStartOfWeek(new Date(today))
      startOfLastWeek.setDate(startOfLastWeek.getDate() - 7)
      const endOfLastWeek = new Date(startOfLastWeek)
      endOfLastWeek.setDate(startOfLastWeek.getDate() + 6)
      return {
        startDate: getYYYYMMDD(startOfLastWeek),
        endDate: getYYYYMMDD(endOfLastWeek)
      }
    }
    case 'this_month': {
      const startOfThisMonth = getStartOfMonth(new Date(today))
      return {
        startDate: getYYYYMMDD(startOfThisMonth),
        endDate: getYYYYMMDD(today)
      }
    }
    case 'last_month': {
      const startOfLastMonth = getStartOfMonth(new Date(today))
      startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1)
      const endOfLastMonth = new Date(startOfLastMonth)
      endOfLastMonth.setMonth(startOfLastMonth.getMonth() + 1)
      endOfLastMonth.setDate(0)
      return {
        startDate: getYYYYMMDD(startOfLastMonth),
        endDate: getYYYYMMDD(endOfLastMonth)
      }
    }
    case 'this_year': {
      const startOfThisYear = getStartOfYear(new Date(today))
      return {
        startDate: getYYYYMMDD(startOfThisYear),
        endDate: getYYYYMMDD(today)
      }
    }
    case 'last_year': {
      const startOfLastYear = getStartOfYear(new Date(today))
      startOfLastYear.setFullYear(startOfLastYear.getFullYear() - 1)
      const endOfLastYear = new Date(startOfLastYear)
      endOfLastYear.setFullYear(startOfLastYear.getFullYear() + 1)
      endOfLastYear.setDate(0)
      return {
        startDate: getYYYYMMDD(startOfLastYear),
        endDate: getYYYYMMDD(endOfLastYear)
      }
    }
    default:
      return {
        startDate: getYYYYMMDD(new Date(dateRange.startDate)),
        endDate: getYYYYMMDD(new Date(dateRange.endDate))
      }
  }
}

/**
 * 与えられた日付の1つ前の期間を取得する関数
 * @param dateRange - データの期間
 */
export const getPreviousDataRange = (
  dateRange: DateRange
): NormalizedDateRange => {
  const normalized = normalizeDateRange(dateRange)
  const currentStartDate = new Date(normalized.startDate)
  const currentEndDate = new Date(normalized.endDate)
  const diff = currentEndDate.getTime() - currentStartDate.getTime()
  const previousEndDate = new Date(currentStartDate)
  previousEndDate.setDate(previousEndDate.getDate() - 1)
  const previousStartDate = new Date(previousEndDate)
  previousStartDate.setTime(previousStartDate.getTime() - diff)
  return {
    startDate: getYYYYMMDD(previousStartDate),
    endDate: getYYYYMMDD(previousEndDate)
  }
}
