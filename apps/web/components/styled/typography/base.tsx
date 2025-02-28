import Typography, { TypographyProps } from '@mui/material/Typography'

/**
 * Base Typography
 */
export type BaseTypographyProps = TypographyProps & {
  /**
   * Base Line Number
   */
  truncate?: number | boolean
}

/**
 * Base Typography
 * @param root0 - Props
 */
export const Base = ({ truncate, ...props }: BaseTypographyProps) => {
  const sx: TypographyProps['sx'] =
    truncate === false
      ? props.sx
      : {
          ...props.sx,
          display: '-webkit-box',
          WebkitLineClamp: truncate === true ? 1 : truncate,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          wordBreak: 'break-word'
        }
  return <Typography {...props} sx={sx} />
}
