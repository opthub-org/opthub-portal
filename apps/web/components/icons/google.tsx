import { Image, ImageProps } from '@/components/utils/image'

/**
 * Googleのアイコン
 * @param props - Props
 */
export const GoogleIcon = (props: Omit<ImageProps, 'src' | 'alt'>) => {
  return (
    <Image
      alt="Google"
      src="/assets/icons/google.svg"
      {...props}
      style={{ ...props.style, display: 'inline-block' }}
    />
  )
}
