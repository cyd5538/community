import React, { useEffect, useRef } from "react";
import { ChatType } from "@/types/types";

interface ChatContainerProps {
  messageList: ChatType[];
  user: string | undefined;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messageList, user }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messageList]);

  return (
    <div 
      ref={containerRef}
      className="flex w-full flex-col py-4 overflow-y-auto h-[90vh]"
    >
      {messageList.map((message, index) => (
        <div
          key={index}
          className={`mb-2 gap-[10px] px-2 ${
            message.user.name === user ? 'flex justify-end' : 'flex items-start justify-end flex-row-reverse'
          }`}
        >
          <div
            className={`rounded p-2 ${
              message.user.name === user
                ? 'bg-green-800 text-white'
                : 'bg-white text-black'
            }`}
          >
            {message.chat}
          </div>
          <div>
            <img 
              className="rounded-full"
              src={message.user.profileImg ? message.user.profileImg : "/public/user.png"} 
              alt={message.user.name}
              width={50}
              height={50}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatContainer;

