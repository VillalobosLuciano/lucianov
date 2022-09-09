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
        <div className="not-prose">
          <SintaxHighlight code={value.code} codeLanguage={value.language} />
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
        'prose prose-slate max-w-none dark:prose-invert dark:text-zinc-400',
        // headings
        'prose-headings:font-normal',
        // lead
        'prose-lead:text-zinc-500 dark:prose-lead:text-zinc-400',
        // links
        'prose-a:font-semibold dark:prose-a:text-amber-500',
        // link underline
        'prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.amber.700))] hover:prose-a:[--tw-prose-underline-size:3px] dark:[--tw-prose-background:theme(colors.zinc.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.amber.700))] dark:hover:prose-a:[--tw-prose-underline-size:3px]',
        // pre
        'prose-pre:w-full prose-pre:rounded-xl prose-pre:bg-zinc-900 prose-pre:shadow-lg dark:prose-pre:bg-zinc-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-zinc-300/10',
        // hr
        'dark:prose-hr:border-zinc-800'
      )}
      {...props}
    >
      <PortableText value={content} components={components} />
    </div>
  )
}
