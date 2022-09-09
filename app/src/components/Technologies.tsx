import { motion } from 'framer-motion'
import Tooltip from '@/components/Tooltip'
import { urlForImage } from '@/lib/sanity'
import Image from 'next/image'
import { Container } from '@/components/Container'
import SanityImage from './SanityImage'

export default function Technologies({ technologies }: any) {
  const user = technologies.slice(0, 5)
  const learning = technologies.slice(3, 5)

  return (
    <div className="">
      <h3 className="text-2xl font-semibold leading-snug tracking-wide text-zinc-200/90">
        Tech Stack
      </h3>
      <p className="py-2 leading-relaxed text-zinc-400">
        I’m Someone, a software designer and entrepreneur based in New York
        City.
      </p>
      <div className="grid grid-cols-3 gap-y-5 gap-x-4 pt-4 pb-8 md:grid-cols-6 md:gap-x-10 md:pt-2">
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
    </div>
  )
}
