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
      {/* <div className="max-w-2xl px-2 pb-8 font-display lg:mx-0">
        <div className="flex items-center space-x-3">
          <div className="h-0 w-0 border-t-[10px] border-l-[16px] border-b-[10px] border-t-transparent border-l-amber-500/50 border-b-transparent" />
          <h2 className="text-4xl font-semibold text-zinc-200">Tech Stack</h2>
        </div>
        <p className="mt-4 text-lg leading-normal tracking-tight text-zinc-400">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC.
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
      </div> */}
    </Container>
  )
}
