import { Server } from "socket.io";
import express from "express";
import http from "http";
import cors from "cors";

const app = express();
app.use(cors);

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://192.168.1.16:3000",
    methods: ["GET", "POST"],
  },
});
const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`app is listening on port :${PORT}`);
  //console.log("io:", io);
});

io.on("connection", (socket) => {
  // console.log("id:", socket.id);
  socket.on("send_message", (data) => {
    console.log(`message of user '${socket.id}' is "${data.message}"`);
    socket.broadcast.emit("received_message", data);
  });
});
