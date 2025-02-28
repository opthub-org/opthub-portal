import { Base, BaseTypographyProps } from './base'

/**
 * bold
 * @param props - Props
 */
export const Bold = (props: BaseTypographyProps) => {
  return <Base fontWeight="bold" {...props} />
}
