

import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = () => {
 

const { loading, data, error } = useGetOtherUsers() || {};

  const { otherUsers } = useSelector((store) => store.user);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full text-gray-400">
        <p className="animate-pulse">Loading users...</p>
      </div>
    );
  }


  if (!otherUsers || otherUsers.length === 0) {
    return (
      <div className="flex justify-center items-center h-full text-gray-400">
        <p>No users available</p>
      </div>
    );
  }

  return (
    <div
      className="overflow-y-auto flex-1 px-2 sm:px-3 py-2 sm:py-3 bg-zinc-900
                 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800"
    >
      {otherUsers.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  );
};

export default OtherUsers;
