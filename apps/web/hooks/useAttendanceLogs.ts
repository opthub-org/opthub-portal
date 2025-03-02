import { discordLogsQuery } from '@/models/discord_log'
import { manualLogsQuery } from '@/models/manual_log'
import { useMemo } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useCurrentUser } from './useCurrentUser'
import { useMonth } from './useMonth'

const NOT_LABOR_CHANNEL = ['休憩室', 'フリースペース']

/**
 * 勤怠ログ
 */
export type AttendanceLog = {
  /**
   * ID
   */
  id: number
  /**
   * 開始日時
   */
  start: Date | null
  /**
   * 終了日時
   */
  end: Date | null
  /**
   * 時間
   */
  time: number | null
  /**
   * カテゴリ
   */
  category: string | undefined
  /**
   * チャンネル
   */
  channel: string
}

/**
 * 勤怠ログを取得する
 * @param date - 日付
 */
export const useAttendanceLogs = (date: Date) => {
  const { account, user } = useCurrentUser()
  const { start, end } = useMonth(date)

  const [discordLogs] = useCollectionData(
    account ? discordLogsQuery(account, start, end) : null
  )
  const discordAttendanceLogs = useMemo<AttendanceLog[] | undefined>(() => {
    if (!discordLogs) return undefined
    const attendanceLogs: AttendanceLog[] = []
    let sessionStart = start
    let sessionEnd = start
    let prevDiscordLog = undefined
    for (const discordLog of discordLogs) {
      switch (discordLog.action) {
        case 'move': {
          sessionEnd = discordLog.createdAt.toDate()
          attendanceLogs.push({
            id: attendanceLogs.length,
            start: prevDiscordLog?.action === 'leave' ? null : sessionStart,
            end: sessionEnd,
            time:
              prevDiscordLog?.action === 'leave'
                ? 0
                : sessionEnd.getTime() - sessionStart.getTime(),
            category: discordLog.before.category?.name,
            channel: discordLog.before.channel.name
          })
          sessionStart = discordLog.createdAt.toDate()
          break
        }
        case 'join':
          if (
            prevDiscordLog?.action === 'move' ||
            prevDiscordLog?.action === 'join'
          ) {
            attendanceLogs.push({
              id: attendanceLogs.length,
              start: prevDiscordLog.createdAt.toDate(),
              end: null,
              time: 0,
              category: prevDiscordLog.after.category?.name,
              channel: prevDiscordLog.after.channel.name
            })
          }
          sessionStart = discordLog.createdAt.toDate()
          break
        case 'leave': {
          sessionEnd = discordLog.createdAt.toDate()
          attendanceLogs.push({
            id: attendanceLogs.length,
            start: prevDiscordLog?.action === 'leave' ? null : sessionStart,
            end: sessionEnd,
            time:
              prevDiscordLog?.action === 'leave'
                ? 0
                : sessionEnd.getTime() - sessionStart.getTime(),
            category: discordLog.before.category?.name,
            channel: discordLog.before.channel.name
          })
          break
        }
      }
      prevDiscordLog = discordLog
    }
    const lastDiscordLog = discordLogs[discordLogs.length - 1]
    const now = new Date()
    if (
      lastDiscordLog !== undefined &&
      (lastDiscordLog.action === 'move' || lastDiscordLog.action === 'join') &&
      lastDiscordLog.createdAt.toDate().getDate() !== now.getDate() // 日付が変更されている場合
    ) {
      sessionStart = lastDiscordLog.createdAt.toDate()
      sessionEnd = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59
      )
      attendanceLogs.push({
        id: attendanceLogs.length,
        start: sessionStart,
        end: sessionEnd,
        time: sessionEnd.getTime() - sessionStart.getTime(),
        category: lastDiscordLog.after.category?.name,
        channel: lastDiscordLog.after.channel.name
      })
    }
    return attendanceLogs
  }, [discordLogs, start])

  const [manualLogs, _, error] = useCollectionData(
    user ? manualLogsQuery(user.uid, start, end) : null
  )

  const totalLaborTime = useMemo(() => {
    if (!discordAttendanceLogs || !manualLogs) return undefined
    let total = 0
    for (const attendanceLog of discordAttendanceLogs) {
      if (NOT_LABOR_CHANNEL.includes(attendanceLog.channel)) continue
      if (attendanceLog.time !== null) total += attendanceLog.time
    }
    for (const manualLog of manualLogs) {
      switch (manualLog.type) {
        case 'work':
          total += manualLog.time
          break
        case 'break':
          total -= manualLog.time
          break
      }
    }
    return total
  }, [discordAttendanceLogs, manualLogs])

  const summaryByDate = useMemo(() => {
    if (!discordAttendanceLogs || !manualLogs) return undefined
    const summary = {}
  }, [discordAttendanceLogs, manualLogs])

  return {
    discordAttendanceLogs,
    totalLaborTime,
    start,
    end
  }
}
