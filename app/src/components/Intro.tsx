import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity'
import { Container } from '@/components/Container'
import SintaxHighlight from './SintaxHighlight'

export default function Intro({ author }: any) {
  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
      },
    },
  }

  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -20 },
  }

  return (
    <Container>
      <div className="mt-6 -mr-10 hidden md:pt-16 lg:block lg:pl-4">
        <motion.div
          className="lg:grid lg:grid-cols-12"
          initial="hidden"
          animate="visible"
          variants={list}
        >
          <div className="relative z-10 mr-4 pb-2 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:py-10">
            <motion.div variants={item}>
              <div className="mx-auto h-[235px] w-[235px] rounded-full">
                <div className="relative aspect-square rounded-full border border-teal-600/20 dark:border-amber-500/20">
                  <Image
                    className="rounded-full object-cover object-center"
                    src={urlForImage(author.picture).url()}
                    alt={author.name}
                    layout="fill"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="relative border border-teal-600/20 dark:border-amber-500/20 lg:col-span-10 lg:col-start-1 lg:row-start-1 lg:grid lg:grid-cols-12 lg:items-center lg:rounded-3xl">
            <div className="relative mx-auto mr-6 max-w-md space-y-5 pl-16 sm:max-w-3xl lg:col-span-10 lg:col-start-1 lg:max-w-none">
              <motion.h2
                className="text-3xl font-extrabold text-zinc-500/90 dark:text-zinc-300"
                variants={item}
              >
                <PortableText value={author.introduction} />
              </motion.h2>
              <motion.div className="text-lg text-zinc-400" variants={item}>
                <PortableText value={author.about} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* mobile version */}
      <div className="mt-20 flex flex-col px-4 lg:hidden">
        <div className="relative mb-6 h-32 w-32">
          <Image
            className="rounded-lg object-contain object-center"
            src={urlForImage(author.picture).url()}
            alt={author.title}
            layout="fill"
          />
        </div>
        <h3 className="text-3xl font-extrabold leading-tight tracking-tight text-zinc-500/90 dark:text-zinc-100">
          {author.name}
        </h3>

        <div className="pt-2 leading-snug text-zinc-400">
          <PortableText value={author.about} />
        </div>
      </div>
    </Container>
  )
}

{
  /* <div className="h-0 w-0 border-l-[100px] border-t-[150px] border-r-[100px] border-l-transparent border-t-green-700 border-r-transparent"></div> */
}
