import { FastifyInstance } from "fastify";
import { Server } from "socket.io"
import { Res } from "../types/fastify";
import { response } from "../helper/response";

let io: Server | null = null;

export const initSocketIO = (httpServer: FastifyInstance) => {
  io = new Server(httpServer.server);
  return io;
};

export const emitEvent = (res: Res, event: string, data: any) => {
  if (!io) return response(res, "Socket.IO not initialized", 400)
  io.emit(event, data);
};