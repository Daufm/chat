import { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";

// connect once globally
const socket = io("http://localhost:3000", {
  transports: ["websocket"], // optional: faster + fewer issues with polling
});

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    console.log("✅ Connected to socket:", socket.id);

    return () => {
      socket.disconnect();
      console.log("❌ Disconnected from socket");
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

// custom hook
export const useSocket = () => useContext(SocketContext);
