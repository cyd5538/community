import type { PostType } from "@/types/types";
import { format, parseISO } from "date-fns";
import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai";

interface PostProps {
  data: PostType
}
 
const Post:React.FC<PostProps> = ({data}) => {
 
  return (
    <div className="flex gap-2 flex-col shadow-sm p-2">
      <div className='flex gap-2 items-center justify-between'>
        <div className='flex gap-2'>
          <img src={data.user.profileImage ? data.user.profileImage : '/public/user.png'} width={30} height={30} alt={data.title} />
          <div>{data.user.nickname}</div>
        </div>
        <div>
          <div>
            {format(parseISO(data.createdAt), 'yy-MM-dd')}
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <h2 className='font-semibold text-lg'>{data.title}</h2>
        <div>{data.description}</div>
        <div className="m-auto">
          {data.image && <img src={data.image} width={400} height={200} alt={data.title}/>}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="cursor-pointer text-2xl hover:text-green-500">
          <AiOutlineComment />
        </div>
        <div className="cursor-pointer text-2xl hover:text-green-500">
          <AiOutlineHeart />
        </div>
      </div>
    </div>
  )
}

export default Post
