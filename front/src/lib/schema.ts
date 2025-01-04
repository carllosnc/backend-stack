import * as z from "zod"

export const signUpSchema = z.object({
  name: z.string().min(2, {
    message: "• must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "• invalid email.",
  }),
  password: z.string().min(8, {
    message: "• must be at least 8 characters.",
  }),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export const signInSchema = z.object({
  email: z.string().email({
    message: "• invalid email.",
  }),
  password: z.string().min(8, {
    message: "• must be at least 8 characters.",
  }),
})

export type SignUpValues = z.infer<typeof signUpSchema>
export type SignInValues = z.infer<typeof signInSchema>

