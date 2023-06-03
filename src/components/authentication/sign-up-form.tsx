'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSignUp } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { z } from 'zod'

import { SignupSchema } from '@/components/authentication/schemas'
import VerifyForm from '@/components/authentication/verify-form'

type FormData = z.infer<typeof SignupSchema>

const SignupForm = () => {
  const [error, setError] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { isLoaded, signUp } = useSignUp()

  const [pendingVerification, setPendingVerification] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(SignupSchema) })

  const onSubmit: SubmitHandler<FormData> = async data => {
    if (!isLoaded) {
      return
    }

    try {
      setIsLoading(true)

      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
      setIsLoading(false)
    } catch (err: any) {
      setError(err.errors[0].longMessage)
    }
    setIsLoading(false)
  }

  return (
    <>
      {pendingVerification && <VerifyForm />}

      {!pendingVerification && (
        <>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* <div>
              <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('first_name', { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.first_name && (
                <p className="mt-2 text-xs text-red-600" id="email-error">
                  {errors.first_name?.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('last_name', { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.last_name && (
                <p className="mt-2 text-xs text-red-600" id="email-error">
                  {errors.last_name?.message}
                </p>
              )}
            </div> */}

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  {...register('email', { required: true, pattern: /^[^\s@]+@globant\.com$/i })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-xs text-red-600" id="email-error">
                  {errors.email?.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  autoComplete="password"
                  {...register('password', { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-xs text-red-600" id="email-error">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  autoComplete="confirmPassword"
                  {...register('confirmPassword', { required: true, pattern: /^[^\s@]+@globant\.com$/i })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-xs text-red-600" id="email-error">
                  {errors.confirmPassword?.message}
                </p>
              )}
              {error && (
                <p className="mt-2 text-xs text-red-600" id="email-error">
                  {error}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 animate-spin"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                )}

                {!isLoading && 'Sign in'}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already has an account?
            <Link href="/sign-in" className="ml-3 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </>
      )}
    </>
  )
}

export default SignupForm
