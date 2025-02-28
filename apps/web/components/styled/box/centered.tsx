import { Base, BaseBoxProps } from './base'

/**
 * Centered Box
 * @param props - Props
 */
export const Centered = (props: BaseBoxProps) => {
  return <Base display="flex" alignItems="center" {...props} />
}
