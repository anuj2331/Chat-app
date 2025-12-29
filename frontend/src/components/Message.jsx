
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  const isSender = message?.senderId === authUser?._id;

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={scroll}
      className={`flex items-end gap-2 my-2 ${
        isSender ? "justify-end" : "justify-start"
      }`}
    >
  
      {!isSender && (
        <div className="flex-shrink-0">
          <img
            src={selectedUser?.profilePhoto}
            alt="User avatar"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-400/30"
          />
        </div>
      )}

   
      <div
        className={`max-w-[75%] sm:max-w-[60%] p-3 sm:p-4 rounded-2xl text-sm sm:text-base shadow-md ${
          isSender
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-black rounded-bl-none"
        }`}
      >
        <p>{message?.message}</p>
        <time
          className={`block text-[10px] sm:text-xs mt-1 opacity-70 ${
            isSender ? "text-gray-200" : "text-gray-600"
          }`}
        >
          {new Date(message?.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
      </div>

    
      {isSender && (
        <div className="flex-shrink-0">
          <img
            src={authUser?.profilePhoto}
            alt="Sender avatar"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-400/30"
          />
        </div>
      )}
    </div>
  );
};

export default Message;
