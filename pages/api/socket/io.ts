import { NextApiResponseIO } from "@/lib/types/socket-res.types";
import { NextApiRequest } from "next";
import { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";
import { MessageType } from "@/lib/types/sendMessage.types";
import { dbConnection } from "@/lib/utils/mongoConnection";
import message from "@/lib/utils/models/message";

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
      console.log("NEW SOCKET CONNECTED", socket.id);
      io.emit("new-user", { info: "A new user joined!" });

      socket.on("send-message", async (obj: MessageType) => {
        await dbConnection();
        await message.create({
          user: obj.user,
          message: obj.message,
          color: obj.color,
          datetime_sent: new Date(obj.datetime_sent).toISOString(),
        });
        io.emit("receive-message", obj);
      });
    });
  }
  res.end();
};

export default io;
