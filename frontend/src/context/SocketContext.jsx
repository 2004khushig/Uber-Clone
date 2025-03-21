import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BASE_URL); // Ensure this environment variable is set
    setSocket(newSocket);

    newSocket.on("connect", () => console.log("Connected to socket server"));
    newSocket.on("disconnect", () => console.log("Disconnected from socket server"));

    return () => newSocket.close();
  }, []);

 

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
