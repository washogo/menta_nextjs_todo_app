import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <Link href="/login">
      <a>ログイン</a>
    </Link>
  )
}

export default Home
