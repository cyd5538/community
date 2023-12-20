import { CommentType } from "@/types/types"
import { format, parseISO } from "date-fns";

interface PostCommentListProps {
  com: CommentType
}

const PostCommentList: React.FC<PostCommentListProps> = ({ com }) => {
  return (
    <div className="flex justify-between items-start w-full">
      <div className="flex gap-4 items-start justify-start">
        <div className="flex flex-col w-[40px]">
          <img
            src={com.user.profileImage ? com.user.profileImage : '/public/user.png'}
            alt={com.user.nickname}
            width={30}
            height={30}
          />
          <div className="text-sm">{com.user.nickname}</div>
        </div>
        <span className="break-all w-full overflow-hidden overflow-wrap">
          {com.text}
        </span>
      </div>
      <div>
        <div className="hidden sm:block text-sm w-[120px]">
          {format(parseISO(com.user.createdAt), 'MM월 dd일 HH:mm')}
        </div>
      </div>
    </div>
  )
}

export default PostCommentList
