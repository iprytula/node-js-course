import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const users = new Set();

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join", (username) => {
    users.add(username);

    // broadcast to all clients that new user is joined
    io.emit("userJoined", username);

    // send the updated user list to all clients
    io.emit("userList", Array.from(users));

    // handle incoming chat message
    socket.on("sendMessage", (message) => {
      // broadcast the received message to all clients
      io.emit("chatMessage", { username, message });
    });

    // handle user disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
      users.delete(username);
      io.emit("userLeft", username);
      io.emit("userList", Array.from(users));
    });
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
