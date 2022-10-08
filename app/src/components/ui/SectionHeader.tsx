import { forwardRef } from 'react'
import { Container } from '../Container'
import clsx from 'clsx'

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
          <div className="flex w-fit">
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
          </div>
          <p
            className={clsx(
              'pt-3 pb-2 leading-relaxed transition-colors duration-1000',
              {
                'text-zinc-400': inView,
                'text-zinc-500': !inView,
              }
            )}
          >
            {SectionDescription}
          </p>
        </div>
      </Container>
    )
  }
)

SectionHeader.displayName = 'SectionHeader'
export default SectionHeader
