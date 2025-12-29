
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { authUser } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  return (
    <div className="flex flex-col sm:flex-row h-screen sm:h-[90vh] w-full max-w-7xl mx-auto rounded-lg overflow-hidden bg-gray-300/20 backdrop-blur-lg shadow-lg">
     
      <div className="w-full sm:w-1/3 md:w-1/4 border-b sm:border-b-0 sm:border-r border-gray-500/30">
        <Sidebar />
      </div>

     
      <div className="flex-1 w-full">
        <MessageContainer />
      </div>
    </div>
  ); 
};

export default HomePage;
