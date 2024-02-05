import { FormEvent, useState } from 'react';
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { handleCommentSubmit } from '@/lib/commentApi'
import PostCommentList from './PostCommentList';
import { CommentType } from '@/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { status401Error, status402Error } from '@/lib/userApi';
import axios from 'axios';
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiNeutral } from "react-icons/bs";
import { Emoji } from '@/types/etc';

interface PostCommentProps {
  userId: string | undefined
  postId: string
  comments: CommentType[]
}

const PostComment:React.FC<PostCommentProps> = ({userId, postId, comments}) => {
  const [comment, setComment] = useState<string>("")
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  
  const queryClient = useQueryClient()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('token');
    
    if(!token) {
      return status402Error()
    }

    try {
      const response = await handleCommentSubmit(userId,postId,comment,token)
      setComment("")
      return response
    } catch (error: unknown) {
      if(axios.isAxiosError(error)){
        if(error?.response?.status === 401) {
          status401Error()
        }
      }
    }
  }

  const CommentMutation = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"]});
    },
    onError : (err) => {
      console.log(err)
    }
  })

  const handleEmojiSelect = (emoji: Emoji) => {
    setComment((prevComment) => prevComment + emoji.native);
  };

  return (
    <div className='flex flex-col pt-4'>
      <form onSubmit={CommentMutation .mutate} className='flex gap-2 relative justify-center items-center'>
        <Input value={comment} type="text" onChange={(e) => setComment(e.target.value)}/>
        <BsEmojiNeutral className='cursor-pointer' onClick={() => setShowEmoji(!showEmoji)} size={30}/>
        {showEmoji && (
          <div className='absolute top-10 right-16 z-40'>
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
          </div>
        )}
        <Button>댓글</Button>
      </form>
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
