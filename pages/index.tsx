import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [selectAction, setSelectedAction] = useState<string>("none");
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>BChaty - Home</title>
      </Head>
      <main>
        <div className="flex items-center justify-center w-full min-h-screen">
          <div className="max-w-sm p-4 mx-auto text-center border-2 border-gray-500 rounded-md shadow-md">
            <h1 className="text-2xl font-bold">BChaty</h1>
            <p className="text-sm text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi
            </p>

            {session ? (
              <>
                <div className="flex justify-center mt-4 space-x-2 text-purple-50">
                  <Link href={"/chat"}>
                    <button className="px-4 py-1 bg-purple-700 rounded-md">View Chats 〽</button>
                  </Link>
                  <button className="px-4 py-1 bg-purple-700 rounded-md" onClick={() => signOut()}>
                    Log out
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-center mt-4 space-x-2 text-purple-50">
                <button className="px-4 py-1 bg-purple-700 rounded-md" onClick={() => setSelectedAction("signup")}>
                  Sign Up 🚀
                </button>
                <button className="px-4 py-1 bg-purple-700 rounded-md" onClick={() => setSelectedAction("login")}>
                  Login 🎯
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
