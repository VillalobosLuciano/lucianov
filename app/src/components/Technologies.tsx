import { motion } from 'framer-motion'
import Tooltip from '@/components/Tooltip'
import { urlForImage } from '@/lib/sanity'
import Image from 'next/image'
import { Container } from '@/components/Container'
import SanityImage from './SanityImage'
import SVGText from './icons/SVGText'
import Arrow from './icons/Arrow'

export default function Technologies({ technologies }: any) {
  const user = technologies.slice(0, 5)
  const learning = technologies.slice(3, 5)

  return (
    <Container className="mb-28 mt-3 flex flex-col space-y-4 md:mb-36">
      <div className="mt-2 flex items-center space-x-8">
        <div className="grid grid-cols-3 gap-8 md:grid-cols-5 md:gap-x-10">
          {user.map((tech: any, i: number) => (
            <motion.div
              className="flex items-center"
              key={tech._id}
              initial={{
                opacity: 0,
                translateX: -5,
                translateY: -5,
              }}
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              transition={{ duration: 0.3, delay: 0.05 + i * 0.1 }}
            >
              <div className="relative h-[32px] w-[32px] flex-none">
                <SanityImage src={tech?.logo} alt={tech?.name} layout="fill" />
              </div>
              <p className="pl-1.5 text-sm text-zinc-400">{tech.name}</p>
            </motion.div>
          ))}
        </div>
        <div className="hidden items-center md:flex">
          <Arrow className="h-[11px] w-fit" />
          <SVGText className="h-[44px] w-fit" text="Current stack" />
        </div>
      </div>
      <div className="hidden items-center space-x-8 md:flex">
        <div className="grid grid-cols-3 gap-y-5 gap-x-4 md:grid-cols-2 md:gap-x-10">
          {learning.map((tech: any, i: number) => (
            <motion.div
              className="flex items-center"
              key={tech._id}
              initial={{
                opacity: 0,
                translateX: -5,
                translateY: -5,
              }}
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              transition={{ duration: 0.3, delay: 0.05 + i * 0.1 }}
            >
              <div className="relative h-[32px] w-[32px] flex-none">
                <SanityImage src={tech?.logo} alt={tech?.name} layout="fill" />
              </div>
              <p className="pl-1.5 text-sm text-zinc-400">{tech.name}</p>
            </motion.div>
          ))}
        </div>
        <div className="hidden items-center md:flex">
          <Arrow className="h-[11px] w-fit" />
          <SVGText className="h-[44px] w-fit" text="Learning" />
        </div>
      </div>
    </Container>
  )
}
