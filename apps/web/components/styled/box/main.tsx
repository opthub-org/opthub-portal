import { MAIN_BOX_PADDING_X } from '@/variables'
import { Base, BaseBoxProps } from './base'

/**
 * Main
 * @param props - BoxProps
 */
export const Main = (props: BaseBoxProps) => {
  return (
    <Base
      {...props}
      sx={{
        paddingX: MAIN_BOX_PADDING_X,
        paddingTop: 3,
        paddingBottom: 4,
        overflowX: 'hidden', // 小要素
        flexGrow: 1
      }}
    />
  )
}
