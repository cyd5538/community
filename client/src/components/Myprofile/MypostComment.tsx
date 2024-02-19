import { CommentType } from "@/types/types"
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa"
import { format, parseISO } from "date-fns"

interface MypostCommentProp {
  comment: CommentType
  likeLength: number
  dislikeLength: number
}

const MypostComment:React.FC<MypostCommentProp> = ({comment, likeLength, dislikeLength}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-start ml-2 gap-2">
        <img
          src={comment.user.profileImage ? comment.user.profileImage : '/public/user.png'}
          alt={comment.user.nickname}
          className="w-8 h-8 object-cover rounded-full"
        />
        <span className="w-4/5">{comment.text}</span>
        <span className="flex gap-[2px] justify-center items-center">
          <FaRegThumbsUp /> {likeLength}
        </span>
        <span className="flex gap-[2px] justify-center items-center">
          <FaRegThumbsDown /> {dislikeLength}
        </span>
        <p className="text-xs text-gray-00">
          {format(parseISO(comment.user.createdAt), 'MM월 dd일 HH:mm')}
        </p>
      </div>
    </div>
  )
}

export default MypostComment
