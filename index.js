import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  connectionStateRecovery: {},
  cors: {
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"]
  }
})

const PORT = process.env.PORT || 5500

io.on("connection", (socket) => {
  // console.log("Socket", socket);
  console.log("User connected", socket.id)
  
  const sessionData = socket.handshake.auth.session
  console.log("Session Data", sessionData)

  

  socket.on("message", ({message, name}) => {
    // console.log(`${name} says: ${message}`);
    io.emit("message", {message, name})
  })

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  })
});

httpServer.listen(PORT);