import { Server } from "socket.io"
import app from "./fastify"

export const SocketIOService = () =>  new Server(app.server)

export function Broadcast(){
    const io = SocketIOService()
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);
      
        // Listen for 'message' events from client
        socket.on('message', (msg) => {
          console.log(`Message from ${socket.id}: ${msg}`);
      
          // Broadcast message to all connected clients
          io.emit('message', msg);
        });
      
        // Handle client disconnect
        socket.on('disconnect', () => {
          console.log(`User disconnected: ${socket.id}`);
        });
      });
}