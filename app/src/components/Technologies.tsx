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
    <div className="font-display">
      <h3 className="text-2xl font-bold leading-snug tracking-tight text-zinc-300">
        Tech Stack
      </h3>
      <p className="py-2 text-zinc-400">
        I’m Someone, a software designer and entrepreneur based in New York
        City.
      </p>
      <div className="grid grid-cols-3 gap-x-8 gap-y-5 py-6 md:grid-cols-6">
        {user.map((tech: any, i: number) => (
          <motion.div
            className="flex items-center"
            key={tech._id}
            initial={{
              opacity: 0,
              translateX: -50,
              translateY: -50,
            }}
            animate={{ opacity: 1, translateX: 0, translateY: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.2 }}
          >
            <div className="relative h-[36px] w-[38px] flex-none">
              <SanityImage src={tech?.logo} alt={tech?.name} layout="fill" />
            </div>
            <p className="pl-1.5 text-sm text-zinc-400">{tech.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
