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
        <div ref={ref} className="max-w-2xl px-2 pb-4 md:pb-10">
          <div className="flex flex-col">
            <h2
              className={clsx(
                'text-3xl font-bold capitalize leading-snug tracking-tight transition-colors duration-1000 md:text-4xl',
                {
                  'text-zinc-300': inView,
                  'text-zinc-500': !inView,
                }
              )}
            >
              {sectionName}
            </h2>

            <hr
              className={clsx('mb-1 h-[3px] w-24 border-zinc-900', {
                '[background-image:linear-gradient(3deg,rgba(56,189,248,0)_0%,#f59e09_32.29%,#fb79004c_67.19%,rgba(236,72,153,0)_100%)]':
                  inView,
                '[background-image:linear-gradient(3deg,rgba(56,189,248,0)_0%,#c3c3c3_32.29%,#ffffff4a_67.19%,rgba(236,72,153,0)_100%)]':
                  !inView,
              })}
            />
          </div>
          <p className="pt-3 pb-2 leading-relaxed text-zinc-400">
            {SectionDescription}
          </p>
        </div>
      </Container>
    )
  }
)

SectionHeader.displayName = 'SectionHeader'
export default SectionHeader
