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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoom } from "@/lib/roomApi";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import customToast from "../ui/customToast";

interface ChatDeleteProp {
  id: string | undefined
}

const ChatDelete:React.FC<ChatDeleteProp> = ({id}) => {
  const queryClient = useQueryClient();
 
  const navigate = useNavigate()

  const handleDelete = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await deleteRoom(id,token)
     
      customToast("success", response.message)
      navigate("/")
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const DeleteMutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["room"] }); 
    },
    onError: (error) => {
      console.log(error)
    },
  });

  return (
  <AlertDialog>
    <AlertDialogTrigger>
      <Button className="bg-green-400 hover:bg-green-500 fixed bottom-2 right-2">채팅방 삭제하기</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>채팅방을 삭제하시겠습니까?</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>취소</AlertDialogCancel>
        <AlertDialogAction onClick={() => DeleteMutation.mutate()}>
          삭제
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default ChatDelete
