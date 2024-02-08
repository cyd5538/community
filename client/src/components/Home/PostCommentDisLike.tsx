import { useThrottle } from "@/hook/useThrottle";
import { handleToggleDisLike } from "@/lib/commentApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaRegThumbsDown } from "react-icons/fa";

interface PostCommentDisLikeProp {
  commentId: string;
  userId: string | undefined
  likneLength: number;
}

const PostCommentDisLike:React.FC<PostCommentDisLikeProp> = ({commentId, userId, likneLength}) => {
  const queryClient = useQueryClient()
  const throttle = useThrottle();

  const handleLike = async () => {
    const token = localStorage.getItem('token');
    try {
      if(userId) {
        const response = await handleToggleDisLike(commentId, userId, token)
        return response
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onClickThrottle = throttle(() => commentLikeMutation.mutate(), 1000);

  const commentLikeMutation = useMutation({
    mutationFn: handleLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
    onError: (err) => {
      console.log(err)
    }
  })

  return (
    <div className="flex justify-center items-center text-black">
      <div className="cursor-pointer" onClick={onClickThrottle}>
        <FaRegThumbsDown size={16}/> 
      </div>
      <div>{likneLength}</div>
    </div>
  )
}

export default PostCommentDisLike
