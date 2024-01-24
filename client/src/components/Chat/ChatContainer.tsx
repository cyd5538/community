import React, { useEffect, useRef, useState } from "react";
import { ChatType } from "@/types/types";
import { format, parseISO } from "date-fns";
import { getRoomMessages } from "@/lib/roomApi";
import useAuth from "@/store/useAuth";

interface ChatContainerProps {
  messageList: ChatType[];
  setMessageList: React.Dispatch<React.SetStateAction<ChatType[]>>
  user: string | undefined;
  roomId: string | undefined
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messageList, user, roomId, setMessageList }) => {
  const { token } = useAuth()
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && messageList.length > 0) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messageList]);


  useEffect(() => {
    getMessage()
  }, [roomId]);

  const getMessage = async() => {
    try {
      if (roomId) {
        const response = await getRoomMessages(roomId, token)
        setMessageList(prevMessages => [...response, ...prevMessages]);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      ref={containerRef}
      className="flex w-full flex-col py-4 overflow-y-auto h-[90vh]"
    >
      {messageList.map((message, index) => (
        <div
          key={index}
          className={`mb-2 gap-[10px] px-2 ${message.user.name === user ? 'flex justify-end items-start ' : 'flex items-start justify-end flex-row-reverse'
            }`}
        >
          <div className={`mb-2 gap-[10px] px-2 ${message.user.name !== user ? 'flex justify-end items-end ' : 'flex items-end justify-end flex-row-reverse'
            }`}>
            <div className={`rounded p-2  ${message.user.name === user
                ? 'bg-green-800 text-white'
                : 'bg-white text-black'
              }`}>
              {message.chat}
            </div>
            <span className="text-xs">
              {format(parseISO(message.createdAt), 'hh시mm분')}
            </span>
          </div>
          <div
            className={`${message.user.name === user && 'hidden'
              }`}
          >
            <img
              className="rounded-full"
              src={message.user.profileImg ? message.user.profileImg : "/public/user.png"}
              alt={message.user.name}
              width={40}
              height={40}
            />
            <span>{message.user.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatContainer;

