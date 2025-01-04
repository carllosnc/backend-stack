"use client"

import { SignUpForm } from '@/components/auth/sign-up-form'
import { SignInForm } from '@/components/auth/sign-in-form'
import { Logo } from '@/components/logo'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { PageLoading } from "@/components/page-loading"

import { authClient } from "@/lib/auth"
import { useRouter } from 'next/navigation'
import { useEffect } from "react";

export default function AuthPage() {
  const { data, isPending } = authClient.useSession()
  const router = useRouter()

  useEffect(() => {
    if (data) {
      router.push('/dashboard')
    }
  }, [data, router, isPending])

  if (isPending) return (<PageLoading />)

  if(!data)
    return (
      <div className="min-h-screen w-full flex lg:flex-col bg-zinc-100 dark:bg-zinc-950">
        <div className="w-full min-h-screen max-w-[50%] lg:max-w-[100%] lg:min-h-[200px] bg-center bg-auth dark:bg-auth-dark bg-cover">
        </div>

        <div className="w-full min-h-screen max-w-[50%] lg:min-h-min lg:max-w-[100%] flex justify-center items-center">
          <div className="w-full max-w-[600px] px-[10px] py-[20px]">
            <Card>
              <CardHeader>
                <div className="flex gap-[20px] items-center sm:flex-col sm:items-start">
                  <Logo className="relative top-[3px] w-[55px] h-auto fill-zinc-950 dark:fill-white" />

                  <div>
                    <CardTitle className="text-[20px]">Welcome!</CardTitle>
                    <CardDescription>Do login or create an account to continue.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="sign-in">
                  <TabsList className="w-full">
                    <TabsTrigger value="sign-in" className="w-full">
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger value="sign-up" className="w-full">
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent className="pt-[10px]" value="sign-in">
                    <SignInForm />
                  </TabsContent>
                  <TabsContent className="pt-[10px]" value="sign-up">
                    <SignUpForm />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
}
