import { FormEvent, useEffect, useState } from 'react'
import socket from '../lib/socket';
import useAuth from '@/store/useAuth';
import { useQuery } from '@tanstack/react-query';
import ChatContainer from '@/components/Chat/ChatContainer';
import ChatInput from '@/components/Chat/ChatInput';
import { ChatType, RoomType } from '@/types/types';

const Chat = () => {  
  const [message, setMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<ChatType[]>([]);
  const [rooms, setRooms] = useState<RoomType[]>([])

  const { getMe } = useAuth();

  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: getMe,
  });
  
  useEffect(() => {
    if(data) {
      socket.emit("login", data.nickname, (res) => {})
    }
  },[data])

  useEffect(() => {
    socket.on("message", (message) => {
      setMessageList((prevState) => prevState.concat(message))
    })
  },[])

  const sendMessage = (e: FormEvent) => {
    e.preventDefault()

    socket.emit("sendMessage", message, (res) => {
      
    })
    setMessage("")
  }

  return (
    <div className="h-screen w-full relative bg-green-500">
      <ChatContainer 
        messageList={messageList}
        user={data?.nickname}
      />
      <ChatInput 
        submit={sendMessage}
        message={message}
        setMessage={setMessage}
      />
    </div>
  )
}

export default Chat
