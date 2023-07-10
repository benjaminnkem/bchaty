import { NextApiResponseIO } from "@/types/socket-res";
import { NextApiRequest } from "next";
import { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

const io = async (req: NextApiRequest, res: NextApiResponseIO) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, { path: path, addTrailingSlash: false });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      io.emit("new-user", { info: "A new user joined!" });

      socket.on("send-message", (obj) => {
        io.emit("receive-message", obj);
      });
    });
  }
  res.end();
};

export default io;
