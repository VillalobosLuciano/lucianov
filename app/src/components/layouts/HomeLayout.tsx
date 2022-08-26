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
    <>
      <Header navigation={navigation} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default HomeLayout
