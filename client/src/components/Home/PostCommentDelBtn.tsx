import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { handleCommentDelete } from "@/lib/commentApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AiOutlineDelete } from "react-icons/ai";

interface PostCommentDelBtnProps {
  postId: string
}

const PostCommentDelBtn:React.FC<PostCommentDelBtnProps> = ({postId}) => {
  const queryClient = useQueryClient()
  
  const commentDelete = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await handleCommentDelete(postId,token)
    } catch (error) {
      console.log(error)
    }
  }

  const commentDelMutation = useMutation({
    mutationFn: commentDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"]});
    },
    onError : (err) => {
      console.log(err)
    }
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger className="hover:bg-green-300 px-1 rounded-full">
        <AiOutlineDelete />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>댓글을 삭제하시겠습니까?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={() => commentDelMutation.mutate()}>
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PostCommentDelBtn
