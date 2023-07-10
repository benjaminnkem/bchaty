"use client";
import { useEffect, useState } from "react";
import { Socket, io as ClientIO } from "socket.io-client";

type MessageType = {
  user: string;
  message: string;
  datetime_sent: Date;
};

const dummyMessages: MessageType[] = [
  {
    user: "John",
    message:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus cumque laboriosam perferendis magnam ab voluptas! Odit maiores illo corporis rerum.",
    datetime_sent: new Date(),
  },
  { user: "Mary", message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", datetime_sent: new Date() },
  { user: "Joshua", message: "Hello world!", datetime_sent: new Date() },
  {
    user: "Benjamin",
    message: "Loremmagnam ab voluptas! Odit maiores illo corporis rerum.",
    datetime_sent: new Date(),
  },
];

const randomUser = new Date().getTime().toString();
const User = randomUser.substring(randomUser.length, randomUser.length - 4);

let socket: Socket;
const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [messageBox, setMessageBox] = useState<string>("");

  useEffect((): any => {
    socket = ClientIO(process.env.NEXT_PUBLIC_SITE_URL!, { path: "/api/socket/io" });

    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
    });

    if (socket) return () => socket.disconnect();
  }, []);

  const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!messageBox || messageBox === "") return;

    const msgData: MessageType = { user: User, message: messageBox, datetime_sent: new Date() };
    socket.emit("send-message", msgData);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full">
        <div>
          <div className="fixed top-0 left-0 w-full p-4 bg-[#262626] z-20">
            <div className="flex items-center justify-center">
              <p className="py-1 font-bold">BChaty by Nkem Benjamin</p>
            </div>
          </div>

          <div className="fixed top-0 left-0 w-full h-full bg-[#1f1f1f]">
            <div className="mt-16 space-y-4" id="msg_body">
              {messages.length > 0 ? (
                messages.map((msg, i) => (
                  <div className="even:bg-[#303030] p-2" key={i}>
                    <p className="font-bold">{msg.user}:</p>
                    <p className="text-sm font-light">{msg.message}</p>
                  </div>
                ))
              ) : (
                <div className="grid space-y-1 text-center place-content-center">
                  <p className="font-bold text-gray-300">No messages</p>
                  <p className="max-w-sm mx-auto text-sm font-light">
                    Send a message to see demo or open this url in another device/window
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="fixed bottom-0 left-0 w-full p-4 bg-[#262626] z-20">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={messageBox}
                onChange={(e) => setMessageBox(e.target.value)}
                className="w-4/5 p-2 duration-200 bg-transparent border border-gray-400 rounded-md focus:outline-none active:outline-none focus:border-orange-600 active:border-orange-600"
              />

              <button
                className="w-1/5 py-2 duration-200 bg-orange-600 rounded-md hover:bg-orange-500"
                onClick={(e) => handleSendMessage(e)}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
