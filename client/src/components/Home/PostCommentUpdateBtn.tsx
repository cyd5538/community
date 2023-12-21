import { PiPencilSimpleLineLight } from "react-icons/pi";

interface PostCommentUpdateBtnProps {
  openNewComment: () => void
}

const PostCommentUpdateBtn:React.FC<PostCommentUpdateBtnProps> = ({openNewComment}) => {
  return (
    <div className="hover:bg-green-300 bg-green-100 text-lg px-[8px] py-[8px] rounded-full cursor-pointer">
      <PiPencilSimpleLineLight 
        onClick={openNewComment}
      />
    </div>
  )
}

export default PostCommentUpdateBtn
