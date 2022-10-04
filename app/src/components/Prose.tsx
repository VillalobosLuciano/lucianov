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
            <div className="relative my-2 min-w-full rounded-md bg-[#fafafa]">
              <Image
                className="rounded-md object-contain"
                src={urlForImage(value).url()}
                alt={value.alt || ' '}
                layout="responsive"
                width={imageWidth}
                height={imageHeight}
              />
            </div>
            <div className="ml-4 flex items-center gap-x-3 pb-1 lg:hidden">
              <div className="border-t-[5px] border-l-[10px] border-b-[5px] border-t-transparent border-l-amber-500/70 border-b-transparent"></div>
              <p className="font-sans text-sm leading-5 text-zinc-400/80">
                {value.caption}
              </p>
            </div>
          </div>
          {value.caption && (
            <div className="hidden min-w-[215px] max-w-xl items-center lg:ml-28 lg:flex lg:gap-x-4">
              <div className="border-t-[5px] border-r-[10px] border-b-[5px] border-t-transparent border-r-amber-500/70 border-b-transparent"></div>
              <p className="font-sans text-sm leading-5 text-zinc-400/80">
                {value.caption}
              </p>
            </div>
          )}
        </div>
      )
    },
    code: ({ value }: any) => {
      return (
        <div className="not-prose flex lg:items-center">
          <div className="relative my-2 min-w-full">
            <SintaxHighlight
              code={value.code}
              codeLanguage={value.language}
              highlightedLines={value.highlightedLines}
            />
            <div className="ml-4 flex items-center gap-x-3 pt-2 lg:hidden">
              <div className="border-t-[5px] border-l-[10px] border-b-[5px] border-t-transparent border-l-amber-500/70 border-b-transparent"></div>
              <p className="font-sans text-sm leading-5 text-zinc-400/80">
                {value.filename}
              </p>
            </div>
          </div>
          {value.filename && (
            <div className="hidden min-w-[215px] max-w-xl items-center lg:ml-28 lg:flex lg:gap-x-4">
              <div className="border-t-[5px] border-r-[10px] border-b-[5px] border-t-transparent border-r-amber-500/70 border-b-transparent"></div>
              <p className="font-sans text-sm leading-5 text-zinc-400/80">
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
        'prose prose-zinc max-w-none font-sans dark:prose-invert dark:text-zinc-100',
        // headings
        'prose-headings:mb-6 prose-headings:mt-16 prose-headings:font-sans prose-headings:text-3xl prose-headings:font-semibold',
        // lead
        'prose-lead:text-zinc-400/80 dark:prose-lead:text-zinc-400',
        // links
        'dark:prose-a:text-amber-500',
        // link underline
        'prose-a:no-underline dark:hover:prose-a:underline',
        // pre
        'prose-pre:prose-pre:rounded-xl prose-pre:bg-zinc-900 prose-pre:shadow-lg dark:prose-pre:bg-amber-400/20 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-zinc-300/10',
        // hr
        'dark:prose-hr:border-zinc-800',
        // code
        'prose-code:rounded prose-code:bg-amber-50/10 prose-code:p-0.5 prose-code:font-sans prose-code:before:content-none prose-code:after:content-none'
      )}
      {...props}
    >
      <PortableText value={content} components={components} />
    </div>
  )
}
