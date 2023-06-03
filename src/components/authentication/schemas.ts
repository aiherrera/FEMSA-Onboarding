import { z } from 'zod'

export const SigninSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({
      message: 'Must be a valid email',
    })
    .regex(/^[^\s@]+@globant\.com$/i, "It doesn't looks like a globant.com email 😕"),
  password: z.string(),
})

export const SignupSchema = z
  .object({
    // first_name: z.string().min(1, { message: 'This field is required' }),
    // last_name: z.string().min(1, { message: 'This field is required' }),
    email: z
      .string()
      .min(1, { message: 'This field is required' })
      .email()
      .regex(/^[^\s@]+@globant\.com$/i, "It doesn't looks like a globant.com email 😕"),
    password: z
      .string()
      .min(8, { message: 'Must contain at least 8 characters' })
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[*\-$%&]).*$/i,
        'The password must have at least 8 characters, one uppercase letter, one number, and one of the following special characters: *, -, $, %, &'
      ),
    confirmPassword: z.string().min(1, { message: 'This field is required' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

export const VerifySchema = z.object({
  code: z.string().regex(/^[0-9]{6}$/i, { message: 'Invalid code' }),
})
