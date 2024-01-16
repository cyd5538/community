import { RoomType } from "@/types/types"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"

interface ChatInfoProps {
  roominfo: RoomType
}

const ChatInfo: React.FC<ChatInfoProps> = ({ roominfo }) => {
  console.log(roominfo)
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="fixed top-2 hover:bg-slate-700 hover:text-white right-6 p-1 rounded-full" size={40}/>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl text-left">{roominfo.room}</SheetTitle>
          <SheetDescription className="text-base text-left">
            <div className="flex gap-[4px] items-center pb-4 relative">
              <img 
                src={roominfo.owner?.profileImage ? roominfo.owner.profileImage : "/public/user.png"} 
                alt={roominfo.owner?.nickname}
                width={55}
                height={55}
                className="rounded-full"
                />
              <div className="text-black text-base flex">
                {roominfo.owner?.nickname}
                <p className="rounded-full w-6 h-6 text-xs bg-green-300 flex justify-center items-center">
                  방장
                </p>
              </div>
            </div>
            <span> 현재 인원 {roominfo.currentMembers} /</span> 
            <span> 총 인원 {roominfo.maxMembers}</span>
          </SheetDescription>
          <SheetDescription className="pt-10">
            <div className="text-black text-base pb-4 text-left">참여중인 유저 </div>
            {roominfo.members?.map((member) => (
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
            ))}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default ChatInfo
