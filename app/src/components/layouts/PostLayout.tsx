import type { ReactNode } from 'react'
import { Header } from '@/components/navigation/Header'
import { Footer } from '@/components/Footer'
import { Container } from '../Container'

interface Props {
  children: ReactNode
}

const navigation = [
  {
    label: 'home',
    pathname: '/',
  },
  {
    label: 'projects',
    pathname: '/projects',
  },
  {
    label: 'posts',
    pathname: '/posts',
  },
]

const PostLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-7xl md:px-4">
        <Header navigation={navigation} />
      </div>
      <main className="mb-auto">{children}</main>
      <div className="mx-auto w-full max-w-7xl md:px-4">
        <Footer />
      </div>
    </div>
  )
}

export default PostLayout
