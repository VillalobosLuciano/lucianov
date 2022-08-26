import { motion } from 'framer-motion'
import Tooltip from '@/components/Tooltip'
import { urlForImage } from '@/lib/sanity'
import Image from 'next/image'
import { Container } from '@/components/Container'

export default function Technologies({ technologies }: any) {
  const user = technologies.slice(0, 3)
  const learning = technologies.slice(3, 5)

  return (
    <Container>
      <hr className="mt-16 mb-2 ml-4 w-6 border-2 border-teal-600/30 dark:border-amber-500/30 lg:mt-24" />
      <div className="px-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-500 dark:text-zinc-300 sm:text-4xl md:mx-0">
          Tech stack
        </h2>
        <p className="mt-2 leading-snug text-zinc-400">
          My current toolbox for flexibility, speed, and readability in
          development.
        </p>
      </div>
      <div className="mx-auto px-4 pt-8">
        <div className="grid grid-cols-3 gap-4 md:grid-cols-9 lg:gap-x-8">
          <div className="col-span-6">
            <div className="grid grid-cols-3 gap-4 px-2 md:grid-cols-6">
              {user.map((tech: any, i: number) => (
                <Tooltip text={tech.name} place="bottom" key={tech._id}>
                  <motion.div
                    className="rounded-md border border-teal-600/10 py-4 dark:border-amber-500/10"
                    key={tech._id}
                    initial={{
                      opacity: 0,
                      translateX: -50,
                      translateY: -50,
                    }}
                    animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.2 }}
                  >
                    <div className="relative col-span-1 flex aspect-square h-10 w-full justify-center md:col-span-2 lg:col-span-1">
                      <Image
                        className="object-contain object-center"
                        alt={tech.name}
                        src={urlForImage(tech.logo).url()}
                        placeholder="blur"
                        blurDataURL={tech.logo.lqip}
                        layout="fill"
                      />
                    </div>
                    <p className="pt-1 text-center text-xs text-zinc-400 lg:hidden">
                      {tech.name}
                    </p>
                  </motion.div>
                </Tooltip>
              ))}
            </div>
            <div className="mb-2 w-full pt-4 text-center">
              <hr className="mb-2 border border-teal-600/30 dark:border-amber-500/30" />
              <span className="font-thin tracking-tight text-zinc-400">
                Current stack
              </span>
            </div>
          </div>
          <div className="col-span-6 lg:col-span-3">
            <div className="grid grid-cols-3 gap-4 px-2 md:grid-cols-3">
              {learning.map((tech: any, i: number) => (
                <Tooltip text={tech.name} place="bottom" key={tech._id}>
                  <motion.div
                    className="rounded-md border border-teal-600/10 py-4 dark:border-amber-500/10"
                    key={tech._id}
                    initial={{
                      opacity: 0,
                      translateX: -50,
                      translateY: -50,
                    }}
                    animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.2 }}
                  >
                    <div className="relative col-span-1 flex aspect-square h-10 w-full justify-center md:col-span-2 lg:col-span-1">
                      <Image
                        className="object-contain object-center"
                        alt={tech.name}
                        src={urlForImage(tech.logo).url()}
                        placeholder="blur"
                        blurDataURL={tech.logo.lqip}
                        layout="fill"
                      />
                    </div>
                    <p className="pt-1 text-center text-xs text-zinc-400 lg:hidden">
                      {tech.name}
                    </p>
                  </motion.div>
                </Tooltip>
              ))}
            </div>
            <div className="mb-2 w-full pt-4 text-center">
              <hr className="mb-2 border border-teal-600/30 dark:border-amber-500/30" />
              <span className="font-thin tracking-tight text-zinc-400">
                Learning
              </span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
