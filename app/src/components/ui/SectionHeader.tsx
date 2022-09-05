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
        <div
          ref={ref}
          className="max-w-2xl px-2 pt-32 pb-8 font-display lg:mx-0"
        >
          <div className="flex items-center space-x-3">
            <div
              className={clsx(
                'h-0 w-0 border-t-[10px] border-l-[16px] border-b-[10px] border-t-transparent border-b-transparent transition-colors duration-1000',
                {
                  'border-l-amber-500/90': inView,
                  'border-l-amber-500/20': !inView,
                }
              )}
            />
            <h2 className="text-4xl font-semibold capitalize text-zinc-200">
              {sectionName}
            </h2>
          </div>
          <p className="mt-4 text-lg leading-normal tracking-tight text-zinc-400">
            {SectionDescription}
          </p>
        </div>
      </Container>
    )
  }
)

SectionHeader.displayName = 'SectionHeader'
export default SectionHeader
