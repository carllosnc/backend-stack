import { Spinner } from "@/components/spinner"

export function PageLoading(){
  return (
    <div className="bg-white w-full min-h-screen flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  )
}