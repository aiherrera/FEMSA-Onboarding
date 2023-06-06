import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

const SignUpPage = () => {
  return (
    <main className="flex h-screen min-h-full flex-1 flex-col items-center justify-center py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link href="/">
          <Image className="mx-auto h-10 w-auto" src="/globant-logo.png" width={100} height={100} alt="Your Company" />
        </Link>
      </div>

      <div className="mt-10 flex w-full justify-center px-6">
        <SignUp />
      </div> 
    </main>
  )
}

export default SignUpPage
