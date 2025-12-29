import { setMessages } from "../redux/messageSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      dispatch((dispatch, getState) => {
        const { messages } = getState().message;
        dispatch(setMessages([...(messages || []), newMessage]));
      });
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, dispatch]);
};

export default useGetRealTimeMessage;



