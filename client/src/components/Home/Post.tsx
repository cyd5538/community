import type { PostType, UserType } from "@/types/types";
import { format, parseISO } from "date-fns";
import { AiOutlineComment } from "react-icons/ai";
import PostLike from "./PostLike";
import PostComment from "./PostComment";
import { useState } from "react";
import PostDisLike from "./PostDisLike";

interface PostProps {
  data: PostType
  user: UserType | undefined
}
 
const Post:React.FC<PostProps> = ({data, user}) => {
  const [commentShow, setCommentShow] = useState<boolean>(false);

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
        <h2 className='font-semibold text-lg break-words'>{data.title}</h2>
        <div className="break-words">{data.description}</div>
        <div className="m-auto ml-4 flex justify-center items-center w-full">
          {data.image && <img src={data.image} width={400} height={200} alt={data.title}/>}
        </div>
        <div className="m-auto ml-4 flex justify-center items-center w-full">
          {data.video && <video src={data.video} width={500} height={300} controls/>}
        </div>
      </div>
      <div className="flex gap-4">
        <div 
          onClick={() => setCommentShow(!commentShow)} 
          className="cursor-pointer text-2xl hover:text-green-500 gap[2px] items-center flex"
        >
          <AiOutlineComment/> 
          <span className="text-xl">{data.comments.length}</span>
        </div>
        <PostLike data={data} id={user?.id}/>
        <PostDisLike data={data} id={user?.id}/>
      </div>
      <div
        className={`${
          commentShow ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition-opacity duration-500`}
      >
        {commentShow && <PostComment userId={user?.id} postId={data._id} comments={data.comments}/> }
      </div>
    </div>
  )
}

export default Post
