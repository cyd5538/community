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
import { getMypostDelete } from '@/lib/postApi'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AiFillDelete } from 'react-icons/ai'

interface MypostDelbtnProps {
  id: string | null
}

const MypostDelbtn: React.FC<MypostDelbtnProps> = ({ id }) => {
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    try {
      const response = await getMypostDelete(id as string);
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const mypostDelete = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "mypost"]});
    },
    onError : (err) => {
      console.log(err)
    }
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger className="hover:bg-green-500 bg-green-300 text-lg px-[8px] py-[8px] rounded-full">
        <AiFillDelete size={16} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>포스트를 삭제하시겠습니까?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={() => mypostDelete.mutate()}>
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default MypostDelbtn
