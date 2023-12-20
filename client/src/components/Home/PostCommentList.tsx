import { CommentType } from "@/types/types"
import { format, parseISO } from "date-fns";
import { Button } from "../ui/button";

interface PostCommentListProps {
  com: CommentType
  userId: string | undefined
}

const PostCommentList: React.FC<PostCommentListProps> = ({ com, userId }) => {
  return (
    <>
      <div className="flex items-start justify-between flex-wrap sm:w-full">
        <div className="flex">
          <div className="flex flex-col items-center w-16">
            <img
              src={com.user.profileImage ? com.user.profileImage : '/public/user.png'}
              alt={com.user.nickname}
              className="w-8 h-8 object-cover rounded-full"
            />
            <div className="text-sm">{com.user.nickname}</div>
          </div>
          <span className="bg-gray-100 text-sm max-w-[200px] sm:max-w-[300px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[500px] p-4 rounded">
  {com.text}
</span>
        </div>
      </div>
      <div className="flex flex-col items-end w-full sm:w-auto sm:ml-2 mt-2 sm:mt-0">
          <div className="text-xs">
            {format(parseISO(com.user.createdAt), 'MM월 dd일 HH:mm')}
          </div>
          {userId === com.user._id && (
            <div className="flex gap-2 text-xs p-2 justify-end">
              <button className="w-12 h-6 rounded-md bg-green-100 text-black">
                수정
              </button>
              <button className="w-12 h-6 rounded-md bg-green-100 text-black">
                삭제
              </button>
            </div>
          )}
        </div>
    </>






  )
}

export default PostCommentList
