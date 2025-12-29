import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";
import { useSelector } from "react-redux";

const Messages = () => {
  useGetMessages();
  useGetRealTimeMessage();

  const { messages } = useSelector((store) => store.message);
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto px-3 sm:px-5 py-3 sm:py-4 bg-zinc-900
                 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800"
    >
      {messages && messages.length > 0 ? (
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))
      ) : (
        <div className="flex flex-col justify-center items-center text-gray-400 h-full">
          <p className="text-lg sm:text-xl font-medium">No messages yet 💬</p>
          <p className="text-sm sm:text-base text-gray-500">
            Start the conversation below!
          </p>
        </div>
      )}

      <div ref={messageEndRef}></div>
    </div>
  );
};

export default Messages;
