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
    <div className="flex min-h-screen w-full flex-col">
      <div className="fixed inset-x-0 top-0 z-50 w-full">
        <Header navigation={navigation} />
      </div>
      <main className="mb-auto">{children}</main>

      <Footer />
    </div>
  )
}

export default PostLayout
