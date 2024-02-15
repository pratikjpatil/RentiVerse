import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import io from "socket.io-client";
import { IoMdSend } from "react-icons/io";

export default function ChatComponent({ user2Id }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(null);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const socketInstance = io(process.env.REACT_APP_BACKEND_URL, {
      withCredentials: true,
    });
    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  const handleJoinChatRoom = () => {
    if (socket && user2Id) {
      socket.emit("join", { user2Id });
    }
  };

  useEffect(() => {
    handleJoinChatRoom();
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("previous messages", (data) => {
        setChatRoomId(data.chatRoomId);
        setMessages(data.messages);
      });

      socket.on("chat message", (data) => {
        console.log(data);
        setArrivalMessage({ fromSelf: false, content: data.content });
        setChatRoomId(data.chatRoomId);
      });
    }

    return () => {
      if (socket) {
        socket.off("chat message");
      }
    };
  }, [socket]);

  const handleSendMsg = async (msg) => {
    if (socket && msg.trim() !== "") {
      socket.emit("chat message", {
        chatRoomId: chatRoomId,
        content: msg,
      });
    }
    const msgs = [...messages];
    msgs.push({ fromSelf: true, content: msg });
    setMessages(msgs);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="mt-2">
      <div className="h-[70vh] overflow-y-auto">
        {" "}
        {messages.map((message) => (
          <div ref={scrollRef} key={uuidv4()}>
            <div
              className={` ${
                message.fromSelf
                  ? "flex items-end justify-end"
                  : "flex items-start justify-start"
              }`}
            >
              <div className="p-4 mt-2 max-w-44 lg:max-w-60 rounded-lg bg-gray-100 shadow-md">
                {" "}
                {/* Adjusted styles */}
                <p className="text-gray-700">{message.content}</p>{" "}
                {/* Adjusted styles */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed relative bottom-0 w-full mt-1 flex justify-center">
        <form
          className="w-full flex justify-between"
          onSubmit={(event) => sendChat(event)}
        >
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="type your message here"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 focus:ring-2 focus:ring-blue-400"
          >
            <IoMdSend className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
}
