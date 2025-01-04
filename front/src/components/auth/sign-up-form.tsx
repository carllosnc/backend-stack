"use client"

import { useRouter } from 'next/navigation'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema, SignUpValues } from "@/lib/schema"
import { authClient } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<boolean | string>(false);
  const [serverError, setServerError] = useState<boolean | string>(false);
  const router = useRouter()

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  })

  async function onSubmit(data: SignUpValues) {
    const { email, password, name } = data;

    authClient.signUp.email({ email, password, name }, {
      onRequest: () => {
        //loading
        setIsLoading(true);
        setAuthError(false);
        setServerError(false);
      },
      onSuccess: () => {
        //redirect
        setIsLoading(false);
        setAuthError(false);
        setServerError(false);

        console.log("calling here!")
        router.push("/dashboard");
      },
      onError: (ctx) => {
        //show message
        setIsLoading(false);
        setAuthError(ctx.error.message || ctx.error.statusText);
        setServerError(false);
      },
      }).then(() => {
        //success
      })
      .catch((err) => {
        setIsLoading(false);
        setAuthError(false);
        setServerError(err.message);
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        { authError && <div className="text-red-500">{authError}</div> }
        { serverError && <div className="text-red-500">{serverError}</div> }

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="text-zinc-700"> Name </span>
                <FormMessage className="inline" />
              </FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="text-zinc-700"> Email </span>
                <FormMessage className="inline" />
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="text-zinc-700"> Password </span>
                <FormMessage className="inline" />
              </FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="text-zinc-700"> Confirm Password </span>
                <FormMessage className="inline" />
              </FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign up"}
        </Button>
      </form>
    </Form>
  )
}

