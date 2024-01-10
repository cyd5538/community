import { useEffect, useState } from 'react'
import socket from '../lib/socket';
import useAuth from '@/store/useAuth';
import { useQuery } from '@tanstack/react-query';

const Chat = () => {  
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [rooms, setRooms] = useState([])
  
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

  const sendMessage = (e) => {
    e.preventDefault()

    socket.emit("sendMessage", message, (res) => {
      
    })
  }
  console.log(messageList)
  return (
    <form onSubmit={sendMessage}>
      <input placeholder='chat' type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
    </form>
  )
}

export default Chat
