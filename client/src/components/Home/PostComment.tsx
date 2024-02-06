
import PostCommentList from './PostCommentList';
import { CommentType } from '@/types/types';

import PostCommentForm from './PostCommentForm';

interface PostCommentProps {
  userId: string | undefined
  postId: string
  comments: CommentType[]
}

const PostComment:React.FC<PostCommentProps> = ({userId, postId, comments}) => {
  return (
    <div className='flex flex-col pt-4'>
      <PostCommentForm postId={postId} userId={userId}/>
      <div className='flex flex-col gap-4 py-4'>
        {comments.map((com) => (
          <PostCommentList 
            key={com._id} 
            com={com}
            userId={userId} 
          />
        ))}
      </div>
    </div>
  )
}

export default PostComment
