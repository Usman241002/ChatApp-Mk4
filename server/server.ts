import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import setupSocketHandlers from "./socket";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const PORT = 8000;

app.use(cors());

setupSocketHandlers(io);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
