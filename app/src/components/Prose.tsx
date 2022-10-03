import { ChevronRightIcon } from '@heroicons/react/solid'
import {
  PortableText,
  toPlainText,
  PortableTextComponents,
} from '@portabletext/react'
import clsx from 'clsx'
import SanityImage from './SanityImage'
import SintaxHighlight from './SintaxHighlight'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity'
import slugify from 'slugify'

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      const imageSize = value.asset._ref.split('-')[2].split('x')
      const imageWidth = imageSize[0]
      const imageHeight = imageSize[1]

      return (
        <div className="not-prose flex lg:items-center">
          <div className="flex min-w-full flex-col">
            <div className="relative mt-2 min-w-full rounded-xl bg-[#fafafa] lg:my-3">
              <Image
                className="rounded-xl object-contain"
                src={urlForImage(value).url()}
                alt={value.alt || ' '}
                layout="responsive"
                width={imageWidth}
                height={imageHeight}
              />
            </div>
            <div className="ml-4 flex items-center gap-x-3 pt-3 pb-1 lg:hidden">
              <div className="border-t-[5px] border-l-[10px] border-b-[5px] border-t-transparent border-l-amber-500/60 border-b-transparent"></div>
              <p className="text-zinc-500">{value.caption}</p>
            </div>
          </div>
          {value.caption && (
            <div className="hidden min-w-[215px] max-w-xl items-center lg:ml-28 lg:flex lg:gap-x-4">
              <div className="border-t-[5px] border-r-[10px] border-b-[5px] border-t-transparent border-r-amber-500/60 border-b-transparent"></div>
              <p className="text-sm leading-5 text-zinc-500">{value.caption}</p>
            </div>
          )}
        </div>
      )
    },
    code: ({ value }: any) => {
      return (
        <div className="not-prose flex lg:items-center">
          <div className="relative my-3 min-w-full">
            <SintaxHighlight
              code={value.code}
              codeLanguage={value.language}
              highlightedLines={value.highlightedLines}
            />
            <div className="ml-4 flex items-center gap-x-3 pt-3 pb-1 lg:hidden">
              <div className="border-t-[5px] border-l-[10px] border-b-[5px] border-t-transparent border-l-amber-500/60 border-b-transparent"></div>
              <p className="text-zinc-500">{value.filename}</p>
            </div>
          </div>
          {value.filename && (
            <div className="hidden min-w-[215px] max-w-xl items-center lg:ml-28 lg:flex lg:gap-x-4">
              <div className="border-t-[5px] border-r-[10px] border-b-[5px] border-t-transparent border-r-amber-500/60 border-b-transparent"></div>
              <p className="text-sm leading-5 text-zinc-500">
                {value.filename}
              </p>
            </div>
          )}
        </div>
      )
    },
  },
}

interface Props {
  className?: string
  content: any
}

export function Prose({ content, className, ...props }: Props) {
  return (
    <div
      className={clsx(
        className,
        'prose prose-zinc max-w-none dark:prose-invert dark:text-zinc-300',
        // headings
        'prose-headings:scroll-mt-28 prose-headings:font-sans prose-headings:font-semibold lg:prose-headings:scroll-mt-[8.5rem]',
        // lead
        'prose-lead:text-zinc-400/80 dark:prose-lead:text-zinc-400',
        // links
        'dark:prose-a:text-amber-500',
        // link underline
        'prose-a:no-underline dark:hover:prose-a:underline',
        // pre
        'prose-pre:prose-pre:rounded-xl prose-pre:bg-zinc-900 prose-pre:shadow-lg dark:prose-pre:bg-zinc-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-zinc-300/10',
        // hr
        'dark:prose-hr:border-zinc-800'
      )}
      {...props}
    >
      <PortableText value={content} components={components} />
    </div>
  )
}
