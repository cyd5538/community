import { RoomType, UserType } from "@/types/types"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import ChatDelete from "./ChatDelete";
import ChatUser from "./ChatUser";

interface ChatInfoProps {
  roominfo: RoomType;
  user: UserType | undefined
}

const ChatInfo: React.FC<ChatInfoProps> = ({ roominfo,user }) => {

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
                <span className="rounded-full w-6 h-6 text-xs bg-green-300 flex justify-center items-center">
                  방장
                </span>
              </div>
            </div>
            <span> 현재 인원 {roominfo.currentMembers} /</span> 
            <span> 총 인원 {roominfo.maxMembers}</span>
          </SheetDescription>
          <SheetDescription className="pt-10">
          <div className="text-black text-base pb-4 text-left">참여중인 유저 </div>
            <div>
              {roominfo.members?.map((member) => (
                <ChatUser 
                  key={member._id}
                  member={member}
                />
              ))}
            </div>
          </SheetDescription>
          <SheetDescription>
            {user?.nickname === roominfo.owner?.nickname && 
              <ChatDelete 
                id={roominfo._id}
              />
            }
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default ChatInfo
