import Link from 'next/link'

type BaseProps = React.ComponentProps<typeof Link>

type Props = Omit<BaseProps, 'href'> & {
  href?: string
}

/**
 * リンクを与えた場合はリンクに、それ以外の場合はリンクにならないコンポーネント
 * @param root0 - Props
 */
export const MaybeLink = ({ href, children, ...otherProps }: Props) => {
  if (href !== undefined) {
    /** 外部リンクなら別タブにする */
    const linkProps = href.startsWith('http')
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {}
    return (
      <a href={href} {...otherProps} {...linkProps}>
        {children}
      </a>
    )
  } else return <>{children}</>
}
