import { NextApiResponseIO } from "@/types/socket-res";
import { NextApiRequest } from "next";
import { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";

export default function SocketHandler(req: NextApiRequest, res: NextApiResponseIO) {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;

    const io = new ServerIO(httpServer, { path: path });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("NEW SOCKET", socket.id);
    });
  }
}
