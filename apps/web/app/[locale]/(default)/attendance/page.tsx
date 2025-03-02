'use client'

import { Box, Typography } from '@/components/styled'
import { AttendanceLog, useAttendanceLogs } from '@/hooks/useAttendanceLogs'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { Card, CardContent, CircularProgress, Paper } from '@mui/material'
import { DataGrid, GridColDef, GridSortModel } from '@mui/x-data-grid'
import { Locale } from '@portal/universal_modules/i18n'
import {
  getHHMMSS,
  getHHMMSSTime,
  getMMDD
} from '@portal/universal_modules/utils'
import { useState } from 'react'

type Props = {
  params: { locale: Locale }
}

/**
 * 認証ページのレイアウト
 * @param props - コンポーネントのprops
 */
const Page = ({ params: { locale } }: Props) => {
  const [date, setDate] = useState(new Date())
  const { discordAttendanceLogs, totalLaborTime } = useAttendanceLogs(date)
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: 'start', sort: 'desc' }
  ])
  if (!discordAttendanceLogs || totalLaborTime === undefined)
    return (
      <Box mx={'auto'} width={'100%'} textAlign={'center'}>
        <CircularProgress />
      </Box>
    )

  const columns: GridColDef<AttendanceLog>[] = [
    {
      field: 'day',
      headerName: '日付',
      width: 120,
      valueGetter: (_, row) => {
        return row.start
          ? getMMDD(row.start)
          : row.end
            ? getMMDD(row.end)
            : '不明'
      }
    },
    {
      field: 'start',
      headerName: '開始時刻',
      width: 140,
      valueGetter: (_, row) => {
        return row.start ? getHHMMSS(row.start) : '不明'
      }
    },
    {
      field: 'end',
      headerName: '終了時刻',
      width: 140,
      valueGetter: (_, row) => {
        return row.end ? getHHMMSS(row.end) : '不明'
      }
    },
    {
      field: 'time',
      headerName: '時間',
      width: 140,
      valueGetter: (_, row) => {
        return row.time !== null ? getHHMMSSTime(row.time) : '不明'
      }
    },
    {
      field: 'category',
      headerName: 'カテゴリ',
      width: 200
    },
    {
      field: 'channel',
      headerName: 'チャンネル',
      width: 200
    }
  ]
  return (
    <>
      <Box.Flex mb={2} alignItems={'center'}>
        <ArrowBackIos
          onClick={() =>
            setDate(new Date(date.getFullYear(), date.getMonth() - 1))
          }
          sx={{ cursor: 'pointer', color: 'primary.main' }}
        />
        <Typography.H1>
          {date.getFullYear()}年{date.getMonth() + 1}月
        </Typography.H1>
        <ArrowForwardIos
          onClick={() =>
            setDate(new Date(date.getFullYear(), date.getMonth() + 1))
          }
          sx={{ cursor: 'pointer', color: 'primary.main' }}
        />
      </Box.Flex>
      <Box.Flex mb={2} gap={2}>
        <Card sx={{ width: 300 }}>
          <CardContent>
            <Typography variant="h4" component="div">
              総労働時間
            </Typography>
            <Typography variant="body1">
              {getHHMMSSTime(totalLaborTime)}
            </Typography>
          </CardContent>
        </Card>
      </Box.Flex>
      <Paper sx={{ width: '100%' }}>
        <DataGrid
          rows={discordAttendanceLogs}
          columns={columns}
          sortModel={sortModel}
          onSortModelChange={setSortModel}
        />
      </Paper>
    </>
  )
}

export default Page
