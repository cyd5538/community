import { UserType } from "@/types/types"

interface ChatUserProp {
  member: UserType
}

const ChatUser:React.FC<ChatUserProp> = ({member}) => {
  return (
    <div className="flex gap-4 items-center">
      <img 
        src={member.profileImage ? member.profileImage : "/public/user.png"} 
        alt={member.nickname}
        width={50}
        height={50}
        className="rounded-full"
      />
      <div className="text-black">{member.nickname}</div>
    </div>
  )
}

export default ChatUser
