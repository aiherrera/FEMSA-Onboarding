import { z } from 'zod'

export const GlobantProfileSchema = z.object({
  first_name: z.string().min(1, { message: 'This field is required' }),
  last_name: z.string().min(1, { message: 'This field is required' }),
  email: z
    .string()
    .min(1, { message: 'This field is required' })
    .email()
    .regex(/^[^\s@]+@globant\.com$/i, "It doesn't looks like a globant.com email 😕"),
  country: z.string(),
  globant_position: z.string(),
})
