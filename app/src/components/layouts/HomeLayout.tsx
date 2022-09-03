import type { ReactNode } from 'react'
import { Header } from '@/components/navigation/Header'
import { Footer } from '@/components/Footer'

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

const HomeLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header navigation={navigation} />
      <main className="mb-auto">{children}</main>
      <Footer />
    </div>
  )
}

export default HomeLayout
