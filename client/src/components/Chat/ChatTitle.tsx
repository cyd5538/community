import { RoomType } from "@/types/types"

interface ChatTitleProps {
  roominfo: RoomType | null
}

const ChatTitle:React.FC<ChatTitleProps> = ({roominfo}) => {
  return (
    <div className="pr-16 flex gap-2 fixed justify-center w-full top-2 items-center">
      <h1 className="text-2xl font-semibold">{roominfo?.room}</h1>
      <p className="text-xl font-semibold text-gray-600">{roominfo?.members.length}</p>
    </div>
  )
}

export default ChatTitle
