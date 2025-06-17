"use client";

import { io, Socket } from "socket.io-client";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const serverURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType>({ socket: null });

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(serverURL, {
      withCredentials: true,
    });

    socketRef.current = socketInstance;
    setSocket(socketInstance);

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
