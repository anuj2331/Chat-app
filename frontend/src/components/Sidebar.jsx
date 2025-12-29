import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const { otherUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      // const res = await axios.get(`http://localhost:8080/api/v1/user/logout`, {
      //   withCredentials: true,
      // });

         const res = await axios.get(`https://chat-app-kmo2.onrender.com/api/v1/user/logout`, {
        withCredentials: true,
          });
      toast.success(res.data.message || "Logged out successfully");
      dispatch(setAuthUser(null));
      dispatch(setMessages([]));
      dispatch(setOtherUsers([]));
      dispatch(setSelectedUser(null));
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out");
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    const foundUser = otherUsers?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (foundUser) {
      dispatch(setOtherUsers([foundUser]));
    } else {
      toast.error("User not found!");
    }
  };

  return (
    <div className="border-r border-zinc-700 p-4 flex flex-col bg-zinc-900 text-white sm:min-w-[250px] md:min-w-[280px] h-full">
      <form
        onSubmit={searchSubmitHandler}
        className="flex items-center gap-2 mb-3"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search..."
          className="w-full bg-zinc-800 text-white text-sm px-3 py-2 rounded-md border border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-400 placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-zinc-700 hover:bg-zinc-600 transition rounded-md p-2"
        >
          <BiSearchAlt2 className="w-5 h-5" />
        </button>
      </form>

      <div className="divider h-px bg-zinc-700 my-2" />

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800">
        <OtherUsers />
      </div>

      <div className="mt-4">
        <button
          onClick={logoutHandler}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
