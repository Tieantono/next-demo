import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Link href="/about" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>About</Link>
      {/* <a href='/products' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Products</a> */}
    </main>
  )
}
