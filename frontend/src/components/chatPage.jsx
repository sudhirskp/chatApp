import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import useChatContext from '../Context/chatContext';
import { useNavigate } from 'react-router';
import SockJS from 'sockjs-client';
import { baseURL } from '../config/axiosHelper';
import { Stomp } from '@stomp/stompjs';
import { getMessages } from '../Services/roomServices';
import toast from 'react-hot-toast';

export const Chatpage = () => {
  const { roomId, currentUser, connect, isCreator } = useChatContext();
  const navigate = useNavigate();

  const handleLeaveRoom = () => {
    if (stompClient && connect) {
      const message = {
        sender: currentUser,
        roomId: roomId,
        action: 'LEAVE',
      };
      stompClient.send(
        `/app/leaveRoom/${roomId}`,
        {},
        JSON.stringify(message)
      );
      navigate('/');
    }
  };

  const handleCloseRoom = () => {
    if (stompClient && connect) {
      const message = {
        sender: currentUser,
        roomId: roomId,
        action: 'CLOSE',
      };
      stompClient.send(
        `/app/closeRoom/${roomId}`,
        {},
        JSON.stringify(message)
      );
      navigate('/');
    }
  };

  useEffect(() => {
    if (!connect) {
      navigate('/');
    }
  }, [connect, roomId, currentUser]);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ChatboxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  // Load old messages
  useEffect(() => {
    async function loadMessages() {
      try {
        const messages = await getMessages(roomId);
        setMessages(messages);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    }
    if (connect) {
      loadMessages();
    }
  }, [roomId, connect]);
  // Initialize WebSocket connection
  useEffect(() => {
    let client = null;
    let subscription = null;
    if (connect && roomId) {
      const socket = new SockJS(`${baseURL}/chat`);
      // Create WebSocket factory function for auto-reconnect
      const wsFactory = () => new SockJS(`${baseURL}/chat`);
      client = Stomp.over(wsFactory);
      // Configure reconnect options
      client.reconnect_delay = 5000; // 5 seconds delay between reconnect attempts
      client.connect(
        {},
        () => {
          setStompClient(client);
          subscription = client.subscribe(
            `/topic/room/${roomId}`,
            (message) => {
              const newMessage = JSON.parse(message.body);
              setMessages((prev) => [...prev, newMessage]);
            }
          );
        },
        (error) => {
          console.error('WebSocket connection error:', error);
          toast.error('WebSocket connection failed');
        }
      );
    }
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
      if (client) {
        client.disconnect(() => {
          console.log('WebSocket disconnected');
        });
      }
    };
  }, [connect, roomId]);

  // Send message handler
  const sendMessage = () => {
    if (stompClient && connect && input.trim()) {
      const message = {
        sender: currentUser,
        content: input,
        roomId: roomId,
      };
      if (stompClient.connected) {
        stompClient.send(
          `/app/sendMessage/${roomId}`,
          {},
          JSON.stringify(message)
        );
        // Do not update messages state here; wait for WebSocket subscription
        setInput('');
      }
    }
  };

  // Scroll to the latest message
  useEffect(() => {
    if (ChatboxRef.current) {
      ChatboxRef.current.scrollTop = ChatboxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="flex flex-col justify-center items-center fixed w-full h-full bg-gray-100 dark:bg-gray-500"
      style={{
        backgroundImage: 'url(image.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'cover',
        backgroundPositionX: '-300%',
      }}
    >
      {/* /* Header container */}
      <header
        className="flex justify-between items-center mt-0.5 bg-gradient-to-r from-purple-500 to-pink-500 shadow-md p-4 border-b w-full"
        style={{
          boxShadow: '0 0 20px rgba(128, 90, 213, 0.5)',
          borderRadius: '0 0 10px 10px',
          backgroundImage: 'url(image.png)',
          backgroundSize: 'cover',
        }}
      >
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-white">
            Room Name:{' '}
            <span className="font-normal text-gray-200">{roomId}</span>
          </h1>
        </div>
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-white">
            User Name:{' '}
            <span className="font-normal text-gray-200">{currentUser}</span>
          </h1>
        </div>        <div className="flex gap-4">
          <button
            onClick={handleLeaveRoom}
            className="px-4 py-2 bg-white text-orange-500 font-medium rounded border border-orange-500 hover:bg-orange-500 hover:text-white transition duration-200"
          >
            Leave Room
          </button>

          {currentUser===isCreator && (
            <button
              onClick={handleCloseRoom}
              className="px-4 py-2 bg-white text-red-500 font-medium rounded border border-red-500 hover:bg-red-500 hover:text-white transition duration-200"
            >
              Close Room
            </button>
          )}
        </div>
      </header>

      {/* Main chat container */}
      <main
        className="py-20 border w-2/3 dark:bg-blue-950 space-y-2 h-[calc(106vh-120px)] mx-auto overflow-y-auto overflow-x-hidden"
        style={{ backgroundImage: 'url(robu-4-bg.png)', backgroundSize: 'cover' }}
        ref={ChatboxRef}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === currentUser ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`p-1 mb-2 ${
                message.sender === currentUser
                  ? 'dark:bg-green-600 self-end'
                  : 'dark:bg-blue-600 self-start'
              } max-w-xs rounded break-words`}
              style={{ margin: '0 10px', wordBreak: 'break-word' }}
            >
              <div className="flex flex-row gap-2">
                <img
                  src="robu-3.png"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full mr-2 mb-1"
                ></img>
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-white mb-1">
                    {message.sender}
                  </p>
                  <p className="text-white">{message.content}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Chat messages send container */}
      <div
        className="border fixed bottom-1 h-auto mb-[-0.2%] rounded px-10 w-250 mr-[-0.1%] ml-[-1.1%] bg-white shadow-md flex items-center justify-between p-2 mx-auto"
        style={{
          backgroundImage: 'url(robu-4-bg.png)',
          backgroundSize: 'cover',
          boxShadow: '0 0 20px rgba(128, 90, 213, 0.5)',
          borderRadius: '10px',
          maxHeight: '30vh',
          overflowY: 'auto',
        }}
      >
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
              e.target.style.height = 'auto';
            }
          }}
          type="text"
          className="w-full border border-gray-300 rounded px-5 text-gray-700 placeholder-gray-400 resize-none overflow-hidden"
          placeholder="Type your message here..."
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            border: '2px solid white',
            overflowY: 'hidden',
            paddingBottom: '0.1rem',
          }}
          onFocus={(e) => {
            e.target.style.boxShadow = '0 0 20px rgba(190, 90, 255, 0.9)';
            e.target.style.borderColor = '#fff';
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = 'none';
            e.target.style.borderColor = '#fff';
          }}
        />
        <div className="flex ml-2">
          <button
            className="bg-green-500 text-white font-medium rounded px-4 py-2 border-green-800 hover:bg-green-800 hover:text-white transition duration-200"
            onClick={sendMessage}
          >
            <Send className="mr-2" />
          </button>          <button 
            onClick={() => toast.success("This Feature Coming Soon !!")}
            className="bg-purple-500 text-white font-medium rounded px-4 py-2 ml-2 border-purple-800 hover:bg-purple-800 transition duration-200 flex items-center"
          >
            <Paperclip className="mr-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatpage;