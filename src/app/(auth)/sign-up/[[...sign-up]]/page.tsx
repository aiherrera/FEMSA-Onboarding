import Image from 'next/image'
import Link from 'next/link'

import SignupForm from '@/components/authentication/sign-up-form'

const SignUp = () => {
  return (
    <main className="flex h-screen min-h-full flex-1 flex-col items-center justify-center rounded-lg py-12 shadow-xl lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link href="/">
          <Image className="mx-auto h-10 w-auto" src="/globant-logo.png" width={100} height={100} alt="Your Company" />
        </Link>

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-10 w-full px-6 sm:mx-auto sm:max-w-sm">
        <SignupForm />
      </div>
    </main>
  )
}

export default SignUp
