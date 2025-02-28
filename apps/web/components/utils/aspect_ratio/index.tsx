import { Box } from '@/components/styled'
import { BoxProps } from '@mui/material'

type Props = {
  children: React.ReactNode
  ratio: number
} & BoxProps

/**
 * 指定されたアスペクト比を持つBoxコンポーネント
 * @param root0 - Props
 */
export const AspectRatio = ({ children, ratio, ...boxProps }: Props) => {
  return (
    <Box {...boxProps}>
      <Box position={'relative'} width={'100%'} paddingTop={`${ratio * 100}%`}>
        <Box
          position={'absolute'}
          left={0}
          top={0}
          width={'100%'}
          height={'100%'}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
