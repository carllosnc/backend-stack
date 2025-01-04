"use client"

import { PageLoading } from "@/components/page-loading";
import { ModeToggle } from "@/components/theme-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useGetSession } from "@/hooks/use-get-sessions";
import { Button } from "@/components/ui/button"
import { FaAngleDown } from "react-icons/fa";
import { signOut } from "@/lib/auth"
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const { data, isPending } = useGetSession()
  const router = useRouter()

  function exit(){
    signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/auth')
        }
      }
    })
  }

  if (isPending){
    return <PageLoading />
  }

  if (data) {
    return (
      <div className="w-full">
        <div className="border-b border-zinc-200 dark:border-zinc-900 w-full flex flex-col">
          <div className="w-full flex justify-between items-center max-w-[1000px] m-auto px-[20px] py-[14px]">
            <div>
              <h1 className="text-[20px] font-bold">ZZ-Front</h1>
              <p className="text-gray-600">Welcome back, {data.user.name}</p>
            </div>

            <div className="flex gap-[10px] items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" >
                    { data.user.name } <FaAngleDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    { data.user.email }
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={exit} className="text-red-500">
                    Sign off
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
