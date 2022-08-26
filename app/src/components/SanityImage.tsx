import Image from 'next/image'
import { urlForImage } from '@/lib/sanity'
import clsx from 'clsx'

interface ImageProps {
  alt: string
  src: {
    src: string
    lqip: string
  }
  layout: 'fixed' | 'fill' | 'intrinsic' | 'responsive' | undefined
  className?: string
  // props: ImageProps
}

export default function SanityImage({
  src,
  alt,
  className,
  layout,
  ...props
}: ImageProps) {
  return (
    <>
      <Image
        {...props}
        className={className}
        alt={alt}
        src={urlForImage(src).url()}
        placeholder="blur"
        blurDataURL={src.lqip}
        layout={layout}
      />
    </>
  )
}
