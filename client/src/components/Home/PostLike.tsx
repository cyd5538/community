import type { PostType } from "@/types/types";
import { toggleLike } from "@/lib/likeApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useThrottle } from "@/hook/useThrottle";
import { FaRegThumbsUp, FaThumbsUp  } from "react-icons/fa";

interface PostLikeProps {
  id: string | undefined
  data: PostType
}

const PostLike: React.FC<PostLikeProps> = ({ data, id }) => {
  const token = localStorage.getItem('token');
  const queryClient = useQueryClient()
  const throttle = useThrottle();

  const toggleLikeMutation = useMutation({
    mutationFn: () => toggleLike(data._id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
    onError: () => {}
  })
 
  const handleLikeThrottle = throttle(() => toggleLikeMutation.mutate(), 1000);

  return (
    <div className="cursor-pointer text-2xl hover:text-green-500 gap[2px] items-center flex">
      {data.likes.some((a) => a.user === id) ? 
        <FaThumbsUp size={16} onClick={handleLikeThrottle} /> : 
        <FaRegThumbsUp size={16}  onClick={handleLikeThrottle} />
      }
      <span className="text-xl">
        {data.likes.length}
      </span>
    </div>
  )
}

export default PostLike
