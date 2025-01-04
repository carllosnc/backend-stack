"use client"

import { authClient } from "@/lib/auth"
import { useRouter } from 'next/navigation'
import { useEffect } from "react";

type Session = typeof authClient.$Infer.Session;

export function useGetSession() {
  const { data, isPending, error } = authClient.useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isPending && !data) {
      router.push('/auth')
    }
  })

  return {
    data: data as Session,
    isPending,
    error
  }
}
