import { FormEvent } from "react"
import { Input } from "../ui/input";

interface ChatInputProps {
  submit: (e: FormEvent) => void
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

const ChatInput:React.FC<ChatInputProps> = ({
  submit,
  message,
  setMessage
}) => {
  return (
    <form 
      className="absolute bottom-0 w-full bg-green-600 h-14 flex justify-center items-center"
      onSubmit={submit}
    >
      <Input 
        className="w-80"
        placeholder='chat'
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)}
      />
    </form>
  )
}

export default ChatInput
