import { io } from "socket.io-client";

let socket = null;

export const connectSocket = () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  socket = io("http://localhost:3000", {
    transports: ["websocket"],
    withCredentials: true,
    auth: { token }
  });

  return socket;
};

export const getSocket = () => socket;
