import type { PostType, UserType } from "@/types/types";
import { format, parseISO } from "date-fns";
import { AiOutlineComment } from "react-icons/ai";
import PostLike from "./PostLike";
import PostComment from "./PostComment";

interface PostProps {
  data: PostType
  user: UserType | undefined
}
 
const Post:React.FC<PostProps> = ({data, user}) => {

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
        <div className="m-auto ml-4 flex justify-center items-center w-full">
          {data.image && <img src={data.image} width={400} height={200} alt={data.title}/>}
        </div>
        <div className="m-auto ml-4 flex justify-center items-center w-full">
          {data.video && <video src={data.video} width={500} height={300} controls/>}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="cursor-pointer text-2xl hover:text-green-500 gap[2px] items-center flex">
          <AiOutlineComment/>
        </div>
        <PostLike data={data} id={user?.id}/>
      </div>
      <PostComment userId={user?.id} postId={data._id} comments={data.comments}/>
    </div>
  )
}

export default Post
