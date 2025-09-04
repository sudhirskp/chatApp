import React, { useState, createContext, useContext } from 'react';


const ChatContext = React.createContext();

export const ChatProvider = ({ children }) => {  const [roomId, setRoomId] = useState("");
  const [currentUser, setcurrentUser] = useState("");
  const [connect, setConnect] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  
  return (
    <ChatContext.Provider value={{ roomId, setRoomId, currentUser, setcurrentUser, connect, setConnect, isCreator, setIsCreator }}>
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => useContext(ChatContext);
export default useChatContext;