import { Fragment, useState } from 'react'
import clsx from 'clsx'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { motion, AnimatePresence } from 'framer-motion'

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
      <AnimatePresence>
        {hovered && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Copy code"
            type="button"
            className={`absolute z-20 hidden h-8 w-8 rounded-md bg-amber-400/5 p-1.5 transition-colors hover:bg-amber-400/10 lg:right-2.5 lg:top-3 lg:block ${
              copied ? 'focus:bg-amber-400/10 focus:outline-none' : ''
            }`}
            onClick={onCopy}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              className={copied ? 'dark:text-amber-400' : 'dark:text-zinc-200'}
            >
              {copied ? (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </>
              ) : (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </>
              )}
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <div className="relative rounded-md bg-zinc-600/10 ring-1 ring-white/10 backdrop-blur">
        <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-amber-300/0 via-amber-500/30 to-amber-300/0" />
        <div className="pt-1 lg:pt-2 lg:pl-3">
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
                    'flex w-full overflow-x-auto pl-2 pt-0.5 pb-4 lg:pt-0 lg:pl-0'
                  )}
                  style={style}
                >
                  <code className="min-w-full px-3 lg:px-4">
                    {tokens.map((line, index) => (
                      <div key={index} {...getLineProps({ line, index })}>
                        <div
                          className={clsx('', {
                            'bg-amber-100/5': hLines(index),
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
