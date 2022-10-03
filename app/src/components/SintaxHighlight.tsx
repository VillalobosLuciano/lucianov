import { Fragment, useState } from 'react'
import clsx from 'clsx'
import Highlight, { defaultProps } from 'prism-react-renderer'

interface Props {
  className?: string
  code: string
  codeLanguage: any
  highlightedLines: number[]
}

export default function SintaxHighlight({
  code,
  codeLanguage,
  highlightedLines,
}: Props) {
  const hLines = (index: number) => {
    if (highlightedLines?.includes(index + 1)) {
      return true
    } else {
      return false
    }
  }

  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  const onEnter = () => {
    setHovered(true)
  }
  const onExit = () => {
    setHovered(false)
    setCopied(false)
  }
  const onCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(code)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
      className="relative pt-0.5"
    >
      {hovered && (
        <button
          aria-label="Copy code"
          type="button"
          className={`absolute right-2 top-2 z-20 hidden h-9 w-9 rounded-md border p-1.5 dark:border-amber-400/30 lg:right-2.5 lg:top-2.5 lg:block ${
            copied
              ? 'border-teal-600/90 focus:border-teal-600/90 focus:outline-none dark:border-amber-400/50 dark:focus:border-amber-400/50'
              : 'border-zinc-300/90'
          }`}
          onClick={onCopy}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            className={
              copied
                ? 'text-teal-600/90 dark:text-amber-400/50'
                : 'text-zinc-400 dark:text-zinc-300'
            }
          >
            {copied ? (
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </>
            ) : (
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </>
            )}
          </svg>
        </button>
      )}

      <div className="relative rounded-2xl bg-zinc-600/10 ring-1 ring-white/10 backdrop-blur">
        <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-amber-300/0 via-amber-500/40 to-amber-300/0" />
        <div className="pt-1 lg:pt-3 lg:pl-3">
          <div className="mt-2 flex items-start text-sm">
            <div
              aria-hidden="true"
              className="hidden select-none border-r border-zinc-300/5 pr-3 text-end font-mono text-zinc-600 lg:flex"
            >
              {Array.from({
                length: code.split('\n').length,
              }).map((_, index) => (
                <Fragment key={index}>
                  {(index + 1).toString()}
                  <br />
                </Fragment>
              ))}
            </div>
            <Highlight
              {...defaultProps}
              code={code}
              language={codeLanguage}
              theme={undefined}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  onClick={() => console.log(getTokenProps)}
                  className={clsx(
                    className,
                    'mb-4 flex w-full overflow-x-auto'
                  )}
                  style={style}
                >
                  <code className="min-w-full px-3 lg:px-4">
                    {tokens.map((line, index) => (
                      <div key={index} {...getLineProps({ line, index })}>
                        <div
                          className={clsx('rounded', {
                            'bg-amber-300/10': hLines(index),
                            'bg-transparent': !hLines(index),
                          })}
                        >
                          {line.map((token, index) => (
                            <span
                              key={index}
                              {...getTokenProps({ token, index })}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </code>
                </pre>
              )}
            </Highlight>
          </div>
        </div>
      </div>
    </div>
  )
}
