import { FormEvent, useState } from 'react';
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { handleCommentSubmit } from '@/lib/commentApi'

interface PostCommentProps {
  userId: string
  postId: string
}

const PostComment:React.FC<PostCommentProps> = ({userId, postId}) => {
  const [comment, setComment] = useState<string>("")
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('token');
    
    try {
      const response = handleCommentSubmit(userId,postId,comment,token)
      setComment("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col pt-4'>
      <form onSubmit={handleSubmit} className='flex gap-2'>
        <Input value={comment} type="text" onChange={(e) => setComment(e.target.value)}/>
        <Button>댓글</Button>
      </form>
    </div>
  )
}

export default PostComment
