import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    if (!selectedUser?._id) return;

    try {
      setSending(true);
      // const res = await axios.post(
      //   `http://localhost:8080/api/v1/message/send/${selectedUser._id}`,
      //   { message },
      //   {
      //     headers: { "Content-Type": "application/json" },
      //     withCredentials: true,
      //   }
      // );

        const res = await axios.post(
        `https://chat-app-kmo2.onrender.com/api/v1/message/send/${selectedUser._id}`,
        { message },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res?.data?.newMessage) {
        dispatch(setMessages([...messages, res.data.newMessage]));
      }

      setMessage("");
    } catch (error) {
      console.error("Message send error:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="px-3 sm:px-4 py-3 border-t border-zinc-700 bg-zinc-900"
    >
      <div className="w-full relative">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder={
            selectedUser
              ? "Type a message..."
              : "Select a user to start chatting..."
          }
          disabled={!selectedUser}
          className={`border text-sm rounded-lg block w-full p-3 pr-10 bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-zinc-500 ${
            !selectedUser ? "opacity-60 cursor-not-allowed" : ""
          }`}
        />
        <button
          type="submit"
          disabled={!message.trim() || sending || !selectedUser}
          className="absolute flex inset-y-0 end-0 items-center pr-3 text-xl text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
