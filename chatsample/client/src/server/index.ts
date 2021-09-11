import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app = express();
const http = createServer(app);
const io = new Server(http);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("<h1>Hello world!</h1>");
});

io.on("connection", (socket: Socket) => {
  console.log("a user connected");
  socket.on("chat message", function (msg) {
    console.log("message: " + JSON.stringify(msg));
    io.emit("chat message", msg);
  });
});

http.listen(3001, () => {
  console.log("listening on *:3001");
});
