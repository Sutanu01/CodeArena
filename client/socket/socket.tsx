"use client";

import { io, Socket } from "socket.io-client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";

const serverURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType>({ socket: null });

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
      }
      return;
    }

    const socketInstance = io(serverURL, {
      withCredentials: true,
      autoConnect: false,
    });

    socketInstance.auth = async (cb: (data: any) => void) => {
      try {
        const token = await getToken();
        cb({ token });
      } catch (err) {
        console.error("Failed to get Clerk token for socket auth:", err);
        cb({ token: null });
      }
    };

    socketInstance.connect();

    socketRef.current = socketInstance;
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      socketRef.current = null;
      setSocket(null);
    };
  }, [isSignedIn, getToken]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
