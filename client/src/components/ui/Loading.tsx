import { Loader } from "lucide-react"

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center">
      <div className="animate-spin">
        <Loader />
      </div>
    </div>
  )
}

export default Loading
