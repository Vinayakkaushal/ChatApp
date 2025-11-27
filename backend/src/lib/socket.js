import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    },
});

const userSocketMap = {};  // userId -> socketId

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId; // FIXED
    if (userId) {
        userSocketMap[userId] = socket.id; // FIXED
    }

    // Send online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);

        if (userId) delete userSocketMap[userId]; // FIXED

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

// Return socket id for a user
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

export { io, app, server };
