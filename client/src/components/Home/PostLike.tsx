import type { PostType } from "@/types/types";
import { toggleLike } from "@/lib/likeApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface PostLikeProps {
  id: string | null
  data: PostType
}

const PostLike: React.FC<PostLikeProps> = ({ data, id }) => {
  const token = localStorage.getItem('token');
  const queryClient = useQueryClient()

  const toggleLikeMutation = useMutation({
    mutationFn: () => toggleLike(data._id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
    onError: (err) => {
      console.log(err)
    }
  })
  console.log()

  return (
    <div className="cursor-pointer text-2xl hover:text-green-500 gap[2px] items-center flex">
      {data.likes.some((a) => a.user === id) ? 
        <AiFillHeart onClick={toggleLikeMutation.mutate} /> : 
        <AiOutlineHeart onClick={toggleLikeMutation.mutate} />
      }
      <span className="text-xl">
        {data.likes.length}
      </span>
    </div>
  )
}

export default PostLike
