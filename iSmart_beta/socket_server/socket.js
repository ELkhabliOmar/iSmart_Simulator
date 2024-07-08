const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer();

const io = socketIo(server);

io.on("connection", (socket) => {
  socket.on('joiningroom', (req) => {
    console.log("They ask for joining ");
    // Create a room and join it using the idTag as the room name
    const roomName = req.idTag;
    socket.join(roomName);
    console.log(`Client joined room: ${roomName}`);
  });
  console.log("A client connected");
  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

io.on("joiningroom", (req) => {
    console.log("when a clinet comes open a room with hes idtage" + req.idTag);
  });

const port = 5002;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
