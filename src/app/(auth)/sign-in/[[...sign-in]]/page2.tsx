import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

const SignInPage = () => {
  return (
    <div className="flex h-screen min-h-full flex-1 flex-col items-center justify-center py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link href="/">
          <Image className="mx-auto h-10 w-auto" src="/globant-logo.png" width={100} height={100} alt="Your Company" />
        </Link>

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 w-full px-6 sm:mx-auto sm:max-w-sm">
        <SignIn />

        <p className="mt-10 text-center text-sm text-gray-500">
          Haven&apos;t created an account?
          <Link href="/sign-up" className="ml-3 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignInPage
