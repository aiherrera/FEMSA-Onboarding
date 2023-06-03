import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSignUp } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { VerifySchema } from '@/components/authentication/schemas'

type FormData = z.infer<typeof VerifySchema>

const VerifyForm = () => {
  const [error, setError] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { isLoaded, signUp, setActive } = useSignUp()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(VerifySchema) })

  const router = useRouter()

  const onPressVerify: SubmitHandler<FormData> = async data => {
    if (!isLoaded) {
      return
    }

    try {
      setIsLoading(true)

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code,
      })
      if (completeSignUp.status !== 'complete') {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(`completeSignUp: ${completeSignUp}`, null, 2))
        setError('Invalid code')
      }
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.push('/')
      }
    } catch (err: any) {
      setError('Invalid code')
      console.error(JSON.stringify(`err: ${err}`, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onPressVerify)}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Enter the code
        </label>
        <div className="mt-2">
          <input
            type="text"
            maxLength={6}
            {...register('code', { required: true })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        {errors.code && (
          <p className="mt-2 text-xs text-red-600" id="email-error">
            {errors.code?.message}
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

          {!isLoading && 'Verify'}
        </button>
      </div>
    </form>
  )
}

export default VerifyForm
