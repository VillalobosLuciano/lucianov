import { forwardRef } from 'react'
import { Container } from '../Container'
import clsx from 'clsx'
import Underline from '@/components/icons/Underline'

interface Props {
  sectionName: string
  SectionDescription: string
  inView: any
}

const SectionHeader = forwardRef<HTMLDivElement, Props>(
  ({ sectionName, SectionDescription, inView }, ref) => {
    return (
      <Container>
        <div ref={ref} className="max-w-2xl">
          <div className="flex w-fit flex-col">
            <h2
              className={clsx(
                'text-3xl font-bold capitalize leading-snug tracking-tight transition-colors duration-1000 md:text-4xl',
                {
                  'text-zinc-300': inView,
                  'text-zinc-400/80': !inView,
                }
              )}
            >
              {sectionName}
            </h2>

            <Underline
              className={clsx(
                'relative -mt-2 -ml-1 flex h-4 w-fit transition-opacity duration-1000',
                {
                  'opacity-100': inView,
                  'opacity-0': !inView,
                }
              )}
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
