import { PiPencilSimpleLineLight } from "react-icons/pi";

interface PostCommentUpdateBtnProps {
  openNewComment: () => void
}

const PostCommentUpdateBtn:React.FC<PostCommentUpdateBtnProps> = ({openNewComment}) => {
  return (
    <div className="hover:bg-green-300 bg-green-100 text-xs w-4 h-4 rounded-full cursor-pointer flex justify-center items-center">
      <PiPencilSimpleLineLight 
        onClick={openNewComment}
      />
    </div>
  )
}

export default PostCommentUpdateBtn
