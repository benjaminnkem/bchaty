"use client";
import { dbConnection } from "@/lib/utils/mongoConnection";
import message from "@/lib/utils/models/message";
import { MessageType } from "@/lib/types/sendMessage.types";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Socket, io as ClientIO } from "socket.io-client";

const rand_colors = [
  "text-red-500",
  "text-red-400",
  "text-green-500",
  "text-green-800",
  "text-purple-500",
  "text-purple-800",
  "text-yellow-500",
  "text-yellow-700",
  "text-stone-500",
  "text-pink-500",
  "text-brown-500",
  "text-slate-400",
];

const randomUser = new Date().getTime().toString();
const User = {
  username: `User_${randomUser.substring(randomUser.length, randomUser.length - 4)}`,
  color: rand_colors[Math.floor(Math.random() * rand_colors.length)],
};

let socket: Socket;
const ChatPage: React.FC = ({ fetchMessages }: any) => {
  const [messages, setMessages] = useState<MessageType[]>(
    JSON.parse(fetchMessages).sort((a: MessageType, b: MessageType) => {
      if (a.datetime_sent > b.datetime_sent) return 1;
      return -1;
    })
  );
  const [messageBox, setMessageBox] = useState<string>("");
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect((): any => {
    socket = ClientIO(process.env.NEXT_PUBLIC_SITE_URL!, { path: "/api/socket/io" });

    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
    });

    // Get Messages from the server
    socket.on("receive-message", (data) => {
      setMessages((pre) => [...pre, data]);
    });

    if (socket) return () => socket.disconnect();
  }, []);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!messageBox || messageBox === "") return;

    const msgData: MessageType = {
      user: User.username,
      message: messageBox.trim(),
      color: User.color,
      datetime_sent: new Date(),
    };
    socket.emit("send-message", msgData);
    setMessageBox("");
    scrollToBottom();
  };

  return (
    <>
      <Head>
        <title>Btchay - Chats</title>
      </Head>
      <div>
        <div className="fixed top-0 left-0 w-full p-4 bg-[#262626] z-20">
          <div className="flex items-center justify-center">
            <p className="py-1 font-bold">BChaty by Nkem Benjamin</p>
          </div>
        </div>

        <div className="bg-[#1f1f1f] min-h-screen mt-16">
          {messages.length > 0 ? (
            <div>
              {messages.map((msg, i) => (
                <div className="even:bg-[#303030] p-2 space-y-1" key={i}>
                  <p className={`font-bold ${msg.color}`}>{msg.user}:</p>
                  <p className="text-sm font-light whitespace-pre-line">{msg.message}</p>
                </div>
              ))}
              <div ref={messageEndRef} className="h-[10rem]"></div>
            </div>
          ) : (
            <div className="grid min-h-screen -mt-16 space-y-1 text-center select-none place-content-center">
              <p className="font-bold text-gray-300">No messages</p>
              <p className="max-w-sm mx-auto text-sm font-light">
                Send a message to see demo or open this url in another device/window
              </p>
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 w-full p-4 bg-[#262626] z-20">
          <div className="flex items-center space-x-2">
            <textarea
              value={messageBox}
              rows={1}
              onChange={(e) => setMessageBox(e.target.value)}
              className="w-4/5 p-2 duration-200 bg-transparent border border-gray-400 rounded-md resize-none focus:outline-none active:outline-none focus:border-orange-600 active:border-orange-600"
            ></textarea>

            <button
              className="w-1/5 py-2 duration-200 bg-orange-600 rounded-md hover:bg-orange-500"
              onClick={(e) => handleSendMessage(e)}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  await dbConnection();
  const messagesFromDB = await message.find().limit(100).sort({ datetime_sent: -1 });

  return {
    props: {
      fetchMessages: JSON.stringify(messagesFromDB),
    },
  };
}

export default ChatPage;
