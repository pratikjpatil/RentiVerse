import React, { useState, useEffect, useRef } from "react";
import './ChatComponent.css'; // Import the CSS file
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
    <div className="container">
      <div className="chat-messages">
        {messages.map((message) => (
          <div ref={scrollRef} key={uuidv4()}>
            <div
              className={`message ${message.fromSelf ? "sended" : "recieved"}`}
            >
              <div className="content ">
                <p>{message.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}
