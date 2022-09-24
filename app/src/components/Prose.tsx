import { PortableText } from '@portabletext/react'
import clsx from 'clsx'
import SanityImage from './SanityImage'
import SintaxHighlight from './SintaxHighlight'

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <>
          <div className="relative mx-auto mt-10 mb-4 h-56 max-w-xl lg:mt-16 lg:h-80">
            <SanityImage
              className="absolute inset-0"
              src={value}
              alt={value.alt || ' '}
              layout="fill"
            />
          </div>
          <p className="mb-12 mt-3 text-center italic text-zinc-600 dark:text-zinc-400">
            {value.caption}
          </p>
        </>
      )
    },
    code: ({ value }: any) => {
      return (
        <div className="not-prose flex items-center">
          <div className="relative min-w-full">
            <SintaxHighlight code={value.code} codeLanguage={value.language} />
          </div>
          {value.filename && (
            <div className="hidden min-w-[200px] max-w-xl items-center lg:ml-[120px] lg:flex lg:gap-x-4">
              <div className="border-t-[5px] border-r-[10px] border-b-[5px] border-t-transparent border-r-amber-500/60 border-b-transparent"></div>
              <p className="text-sm text-zinc-400/80">{value.filename}</p>
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
