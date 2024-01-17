import { FormEvent, useEffect, useState } from 'react'
import socket from '../lib/socket';
import useAuth from '@/store/useAuth';
import { useQuery } from '@tanstack/react-query';
import ChatContainer from '@/components/Chat/ChatContainer';
import ChatInput from '@/components/Chat/ChatInput';
import ChatInfo from '@/components/Chat/ChatInfo';
import { ChatType, RoomType } from '@/types/types';
import { useLocation } from 'react-router-dom';
import ChatTitle from '@/components/Chat/ChatTitle';

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const [roominfo, setRoomInfo] = useState<RoomType | null>(null);
  const [messageList, setMessageList] = useState<ChatType[]>([]);

  const { getMe } = useAuth();

  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: getMe,
  });

  const location = useLocation();
  const regex = /\/room\/(.*)/;
  const title = location.pathname.match(regex);

  useEffect(() => {
    if (data && title) {
      const id = data.id;
  
      // 페이지를 나갈 때 leaveRoom 이벤트 실행
      socket.emit('leaveRoom', title[1], id);
  
      return () => {
        socket.emit('leaveRoom', title[1], id);
      };
    }
  }, [data]);
  
  useEffect(() => {
    if (data && title) {
      const id = data.id;
      socket.emit('joinRoom', title[1], id);
    }
  }, [data]);
  
  // 방 정보 갱신
  useEffect(() => {
    socket.on('currentRoomInfo', (room) => {
      setRoomInfo(room);
    });

    return () => {
      socket.off('currentRoomInfo');
    };
  }, [])
  
  // 메세지 저장
  useEffect(() => {
    socket.on('message', (newMessage) => {
      try {
        setMessageList((prevState) => prevState.concat(newMessage));
      } catch (error) {
        console.error(error);
      }
    });

    return () => {
      socket.off("message");
    };
  }, [messageList, data]);

  // 메세지 보내기
  const sendMessage = (e: FormEvent) => {
    e.preventDefault();

    if (title && data) { 
      const id = data.id
      socket.emit('sendMessage', title[1], id, message, (res) => {
        try {
          console.log(res)
        } catch (error) {
          console.error(error);
        }
      });

      setMessage("");
    }
  };
  

  console.log(roominfo)
  return (
    <div className="h-screen w-full relative bg-green-500">
      <ChatTitle 
        roominfo={roominfo}
      />
      <ChatInfo 
        roominfo={roominfo}
        user={data}
      />
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
  );
};

export default Chat;
