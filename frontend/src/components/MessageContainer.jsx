import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user
  );

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <>
      {selectedUser ? (
        <div className="flex flex-col h-[80vh] sm:h-[85vh] md:h-[90vh] w-full sm:min-w-[400px] md:min-w-[550px] bg-zinc-900 rounded-lg overflow-hidden shadow-lg">
          <div className="flex items-center gap-3 bg-zinc-800 text-white px-4 py-3 border-b border-zinc-700">
            <div className="relative">
              <img
                src={selectedUser?.profilePhoto}
                alt="user-profile"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-600"
              />

              {isOnline && (
                <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-800"></span>
              )}
            </div>

            <div className="flex flex-col">
              <p className="font-semibold text-base sm:text-lg">
                {selectedUser?.fullName}
              </p>
              <span
                className={`text-xs ${
                  isOnline ? "text-green-400" : "text-gray-400"
                }`}
              >
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-2 bg-zinc-900">
            <Messages />
          </div>

          <div className="p-3 sm:p-4 bg-zinc-800 border-t border-zinc-700">
            <SendInput />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-center h-[80vh] sm:h-[85vh] md:h-[90vh] w-full sm:min-w-[400px] md:min-w-[550px] bg-zinc-900 rounded-lg shadow-inner">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Hi, {authUser?.fullName || "User"} 👋
          </h1>
          <p className="text-lg sm:text-xl text-gray-300">
            Let’s start a conversation!
          </p>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
