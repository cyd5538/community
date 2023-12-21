import { CommentType } from "@/types/types"
import { format, parseISO } from "date-fns";
import PostCommentDelBtn from "./PostCommentDelBtn";
import PostCommentUpdateBtn from "./PostCommentUpdateBtn";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { handelCommentUpdate } from "@/lib/commentApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PostCommentListProps {
  com: CommentType
  userId: string | undefined
}

const PostCommentList: React.FC<PostCommentListProps> = ({ com, userId }) => {
  const [isupdate, setIsupdate] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
  
  const queryClient = useQueryClient()

  const openNewComment = () => {
    setIsupdate(true)
  }

  const handelComment = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await handelCommentUpdate(com._id, newComment, token)
      setNewComment("");
      setIsupdate(false);
    } catch (error) {
      console.log(error)
    }
  }

  const commentUpdateMutation = useMutation({
    mutationFn: handelComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"]});
    },
    onError : (err) => {
      console.log(err)
    }
  })

  return (
    <>
      <div className="flex items-start justify-between flex-wrap sm:w-full">
        <div className="flex w-full">
          <div className="flex flex-col items-center w-16">
            <img
              src={com.user.profileImage ? com.user.profileImage : '/public/user.png'}
              alt={com.user.nickname}
              className="w-8 h-8 object-cover rounded-full"
            />
            <div className="text-sm">{com.user.nickname}</div>
          </div>
          {isupdate ? 
            <div className="flex gap-2 w-full">
              <Input value={newComment} onChange={(e) => setNewComment(e.target.value)} type="text" />
              <div className="flex gap-2">
                <Button onClick={() => commentUpdateMutation.mutate()} className="text-xs px-2 py-1 bg-green-500 hover:bg-green-700">업데이트</Button>
                <Button className="text-xs px-2 py-1 bg-green-500 hover:bg-green-700" onClick={() => setIsupdate(false)}>취소</Button>
              </div>
            </div>
            :
            <span className="bg-gray-100 text-sm max-w-[200px] sm:max-w-[300px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[500px] p-4 rounded">
              {com.text}
            </span>
          }
        </div>
      </div>
      <div className="flex justify-end gap-4 items-center w-full sm:w-auto sm:ml-2 mt-2 sm:mt-0">
        {userId === com.user._id && (
          <div className="flex gap-2 text-xs p-2 justify-end">
            <PostCommentUpdateBtn openNewComment={openNewComment}/>
            <PostCommentDelBtn postId={com._id}/>
          </div>
        )}
        <div className="text-xs">
          {format(parseISO(com.user.createdAt), 'MM월 dd일 HH:mm')}
        </div>
      </div>
    </>






  )
}

export default PostCommentList
