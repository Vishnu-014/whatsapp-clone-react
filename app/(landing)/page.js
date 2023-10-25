//import { Button } from '@/components/ui/button'
import Image from 'next/image'

import LoginScreen from './_components/login-screen'

// #111B21
// #3C4449

export default function Home() {
  return (
    <main className='bg-[#111B21] h-full flex items-center justify-center'>
      <LoginScreen />
    </main>
  )
}
