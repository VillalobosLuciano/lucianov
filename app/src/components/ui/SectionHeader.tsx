import { forwardRef } from 'react'
import { Container } from '../Container'
import clsx from 'clsx'
import { useState } from 'react'

interface Props {
  sectionName: string
  SectionDescription: string
  inView: any
}

const SectionHeader = forwardRef<HTMLDivElement, Props>(
  ({ sectionName, SectionDescription, inView }, ref) => {
    return (
      <Container>
        <div ref={ref} className="max-w-2xl px-2 pb-10 font-display">
          <div className="flex items-center space-x-2">
            {/* <div
              className={clsx(
                'mt-1.5 h-7 w-7 transition-colors duration-1000',
                {
                  'text-amber-500/60': inView,
                  'text-zinc-500': !inView,
                }
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div> */}
            <h2
              className={clsx(
                'text-4xl font-semibold capitalize transition-colors duration-1000',
                {
                  'text-zinc-300': inView,
                  'text-zinc-500': !inView,
                }
              )}
            >
              {sectionName}
            </h2>
          </div>
          <p className="mt-6 text-lg leading-normal tracking-tight text-zinc-400">
            {SectionDescription}
          </p>
        </div>
      </Container>
    )
  }
)

SectionHeader.displayName = 'SectionHeader'
export default SectionHeader
