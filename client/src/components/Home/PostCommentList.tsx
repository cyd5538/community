import { CommentType } from "@/types/types"
import { format, parseISO } from "date-fns";
import PostCommentDelBtn from "./PostCommentDelBtn";
import PostCommentUpdateBtn from "./PostCommentUpdateBtn";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { handelCommentUpdate } from "@/lib/commentApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PostCommentLike from "./PostCommentLike";

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
      return response
      setIsupdate(false);
    } catch (error) {
      console.log(error)
    }
  }

  const commentUpdateMutation = useMutation({
    mutationFn: handelComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
    onError: (err) => {
      console.log(err)
    }
  })

  return (
    <>
      <div className="flex items-start justify-between flex-wrap sm:w-full">
        <div className="flex w-full">
          <div className="flex flex-col items-center w-20 flex-shrink-0">
            <img
              src={com.user.profileImage ? com.user.profileImage : '/public/user.png'}
              alt={com.user.nickname}
              className="w-8 h-8 object-cover rounded-full"
            />
            <div className="text-sm text-center">{com.user.nickname}</div>
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
            <div className="flex gap-2">
              <span className="bg-gray-100 text-sm max-w-fit w-auto p-4 rounded">
                {com.text}
              </span>
              <div className="flex flex-col items-end justify-start">
                <div className="text-xs text-center flex gap-2 justify-center items-center text-gray-400">
                  <PostCommentLike 
                    commentId={com._id}
                    userId={userId}
                    likneLength={com.likes.length}
                  />
                  {format(parseISO(com.user.createdAt), 'MM월 dd일 HH:mm')}
                </div>
                {userId === com.user._id && (
                  <div className="flex gap-2 text-xs p-2 justify-end">
                    <PostCommentUpdateBtn openNewComment={openNewComment} />
                    <PostCommentDelBtn postId={com._id} />
                  </div>
                )}
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default PostCommentList
