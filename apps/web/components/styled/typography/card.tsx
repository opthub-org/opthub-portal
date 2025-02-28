'use client'

import { Base, BaseTypographyProps } from './base'

/**
 * CardTitle
 * @param props - Props
 */
export const CardTitle = (props: BaseTypographyProps) => {
  return (
    <Base
      gutterBottom
      fontWeight={600}
      truncate={2}
      component="h3"
      {...props}
    />
  )
}

/**
 * CardSubtitle
 * @param props - Props
 */
export const CardSubtitle = (props: BaseTypographyProps) => {
  return <Base variant="caption" truncate={2} {...props} />
}

/**
 * CardActions
 * @param props - Props
 */
export const CardActionsDate = (props: BaseTypographyProps) => {
  return <Base variant="caption" {...props} />
}
