import { NextApiResponse } from "next";
import { Socket as NetSocket, Server as NetServer } from "net";
import { Server as ServerIO } from "socket.io";

export type NextApiResponseIO = NextApiResponse & {
  socket: NetSocket & {
    server: NetServer & {
      io: ServerIO;
    };
  };
};
