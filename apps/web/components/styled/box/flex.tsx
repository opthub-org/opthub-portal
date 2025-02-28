import { Base, BaseBoxProps } from './base'

/**
 * Flex Box
 * @param props - Props
 */
export const Flex = (props: BaseBoxProps) => {
  return <Base display="flex" {...props} />
}
