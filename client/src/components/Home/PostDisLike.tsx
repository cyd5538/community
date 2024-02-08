import type { PostType } from "@/types/types";
import { toggleDisLike } from "@/lib/likeApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useThrottle } from "@/hook/useThrottle";
import { FaRegThumbsDown, FaThumbsDown } from "react-icons/fa";

interface PostDisLikeProps {
  id: string | undefined
  data: PostType
}

const PostDisLike: React.FC<PostDisLikeProps> = ({ data, id }) => {
  const token = localStorage.getItem('token');
  const queryClient = useQueryClient()
  const throttle = useThrottle();

  const toggleLikeMutation = useMutation({
    mutationFn: () => toggleDisLike(data._id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
    onError: () => {}
  })
 
  const handleLikeThrottle = throttle(() => toggleLikeMutation.mutate(), 1000);

  return (
    <div className="cursor-pointer text-2xl hover:text-green-500 gap[2px] items-center flex">
      {data.disLikes.some((a) => a.user === id) ? 
        <FaThumbsDown size={16} onClick={handleLikeThrottle} /> : 
        <FaRegThumbsDown size={16} onClick={handleLikeThrottle} />
      }
      <span className="text-xl">
        {data.disLikes.length}
      </span>
    </div>
  )
}

export default PostDisLike
