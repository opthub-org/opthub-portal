import { MaybeLink } from '@/components/utils/maybe_link'
import Avatar, { AvatarProps } from '@mui/material/Avatar'

/**
 * Base Avatar
 */
export type BaseAvatarProps = AvatarProps & { href?: string; size?: number }

/**
 * Base Avatar
 * @param root0 - Props
 */
export const Base = ({ href, size, ...props }: BaseAvatarProps) => {
  const sx: AvatarProps['sx'] =
    size === undefined
      ? props.sx
      : {
          ...props.sx,
          width: size,
          height: size
        }
  if (typeof href === 'string') {
    return (
      <MaybeLink href={href} passHref>
        <Avatar {...props} sx={sx} />
      </MaybeLink>
    )
  }
  return <Avatar {...props} sx={sx} />
}
