"use client"

import { useGetSession } from "@/hooks/use-get-sessions"
import { PageLoading } from "@/components/page-loading"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth"
import { useRouter } from 'next/navigation'

export default function Settings() {
  const router = useRouter()
  const { data, isPending } = useGetSession()

  function exit(){
    signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/auth')
        }
      }
    })
  }

  if (isPending) return <PageLoading />

  if(data) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Button onClick={exit}>
          { `Sign out: ${data.user.email}` }
        </Button>
      </div>
    );
  }
}
