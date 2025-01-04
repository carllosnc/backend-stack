"use client"

import { useRouter } from 'next/navigation'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema, SignInValues } from "@/lib/schema"
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

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<boolean | string>(false);
  const [serverError, setServerError] = useState<boolean | string>(false);
  const router = useRouter()

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: SignInValues) {

    const { email, password } = data;

    authClient.signIn.email({ email, password }, {
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
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        { authError && <div className="text-red-500">{authError}</div> }
        { serverError && <div className="text-red-500">{serverError}</div> }

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

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign In"}
        </Button>
      </form>
    </Form>
  )
}

