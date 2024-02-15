const { Server } = require("socket.io");
const mongoose = require("mongoose");
const Chat = require("../models/chat");
const User = require("../models/chat");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  io.use((socket, next) => {
    try {
      const cookieString = socket.handshake.headers.cookie || "NOCOOKIE";
      const cookies = cookie.parse(cookieString);
      const token = cookies.token;

      if (!token) {
        return next(new Error("Missing JWT token"));
      }
      console.log("Here");
      const user = jwt.verify(token, process.env.SECRET_KEY);
      socket.user = user;
      next();
    } catch (error) {
      return next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    const user1Id = socket.user.id;
    // Handle joining a chat room
    socket.on("join", async ({ user2Id }) => {
      console.log(`user2Id: ${JSON.stringify(user2Id)}`);
      try {
        // Generate the chat room ID on the server side
        const chatRoomId = [user1Id, user2Id].sort().join("_");

        // Check if the chat room exists
        let chat = await Chat.findOne({ chatRoomId });

        // If the chat room doesn't exist, create a new one
        if (!chat) {
          chat = new Chat({
            chatRoomId: chatRoomId,
            users: [user1Id, user2Id],
            messages: [],
          });

          await chat.save();
        }

        // Join the chat room
        socket.join(chatRoomId);
        console.log(
          `Socket ${socket.id} joined chat room ${JSON.stringify(chatRoomId)}`
        );

        // Load previous messages from the database and emit to the user
        const previousMessages = chat.messages.map((message) => {
          return {
            fromSelf: message.sender._id.toString() === socket.user.id ? true : false,
            content: message.content,
          };
        });
        

        // Emit previous messages to the user who just joined
        socket.emit("previous messages", {
          chatRoomId: chatRoomId,
          messages: previousMessages,
        });
      } catch (error) {
        console.error("Error joining chat room:", error);
      }
    });

    // Handle chat messages
    socket.on("chat message", async ({ chatRoomId, content }) => {
      try {
        const chat = await Chat.findOne({ chatRoomId });
        
        if (chat) {
          const message = { sender: user1Id, content};
          chat.messages.push(message);
          await chat.save();
          // Emit the message to all users in the chat except the sender
          socket.broadcast.to(chatRoomId).emit("chat message", { chatRoomId, content });
        }
      } catch (error) {
        console.error("Error handling chat message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = { setupSocket };
