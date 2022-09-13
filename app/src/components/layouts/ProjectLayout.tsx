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

const HomeLayout = ({ children }: Props) => {
  return (
    <Container className="flex min-h-screen max-w-7xl flex-col">
      <Header navigation={navigation} />
      <main className="mb-auto px-5 md:px-0">{children}</main>
      <Footer />
    </Container>
  )
}

export default HomeLayout
