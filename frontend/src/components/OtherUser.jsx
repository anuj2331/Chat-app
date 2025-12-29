import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);

  const isOnline = onlineUsers?.includes(user._id);
  const isSelected = selectedUser?._id === user?._id;

  const handleSelectUser = () => {
    dispatch(setSelectedUser(user));
  };

  return (
    <>
      <div
        onClick={handleSelectUser}
        className={`flex items-center gap-3 p-2 sm:p-3 cursor-pointer transition-all duration-200 rounded-lg
          ${
            isSelected
              ? "bg-zinc-200 text-black"
              : "text-white hover:bg-zinc-200 hover:text-black"
          }`}
      >
        <div className="relative flex-shrink-0">
          <img
            src={user?.profilePhoto}
            alt="user-profile"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-500/30"
          />

          {isOnline && (
            <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-800"></span>
          )}
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <p className="font-medium truncate">{user?.fullName}</p>
          </div>
          <span
            className={`text-xs ${
              isOnline ? "text-green-400" : "text-gray-400"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      <div className="h-[1px] bg-gray-600/30 my-1 mx-2"></div>
    </>
  );
};

export default OtherUser;
