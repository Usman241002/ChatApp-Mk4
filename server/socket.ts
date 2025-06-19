import type { Server, Socket } from "socket.io";
import { addUser, getUsers, removeUser } from "./data/users";
import type { User } from "../shared/types";

export default function setupSocketHandlers(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log(`User connected`);

    socket.on("login", (data: User) => {
      addUser(data);
      io.emit("usersList", getUsers());
      console.log(`${socket.id} | ${data.username} logged in`);
    });

    socket.on("getUsersList", () => {
      socket.emit("usersList", getUsers());
    });

    socket.on("message", (data) => {
      const { id, userDetails, message, unreadStatus } = data;
      io.to(id).emit("message", {
        id: message.from,
        userDetails,
        message,
        unreadStatus,
      });
    });

    socket.on("logout", (data) => {
      const username = removeUser(data);
      console.log(`${data} | ${username} User logged out`);
      io.emit("usersList", getUsers());
    });

    socket.on("disconnect", () => {
      const username = removeUser(socket.id);
      console.log(`${socket.id} | ${username} User logged out`);
      io.emit("usersList", getUsers());
    });
  });
}
