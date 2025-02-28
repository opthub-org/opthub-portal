import { MaybeLink } from '@/components/utils/maybe_link'
import { ListItemIcon, ListItemText, SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { Base, BaseMenuItemProps } from './base'

type Props = BaseMenuItemProps & {
  icon?: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string
  }
  text?: string
  color?: string
  href?: string
}

/**
 * MenuItem Shorthand
 * @param props - Props
 */
export const Shorthand = ({
  icon: Icon,
  text,
  color,
  href,
  ...otherProps
}: Props) => {
  const colorSx = color === undefined ? {} : { color }
  return (
    <MaybeLink href={href} passHref>
      <Base {...otherProps}>
        {/* icon が無ければ表示しない */}
        {Icon && (
          <ListItemIcon sx={colorSx}>
            <Icon fontSize="small" />
          </ListItemIcon>
        )}
        {/* text が無ければ表示しない */}
        {text !== undefined && <ListItemText sx={colorSx}>{text}</ListItemText>}
      </Base>
    </MaybeLink>
  )
}
