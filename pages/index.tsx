import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import { useState } from "react";

export default function Home() {
  const [selectAction, setSelectedAction] = useState<string>("none");

  return (
    <main>
    <div className="flex items-center justify-center w-full min-h-screen">
        <div className="p-4 text-center border-2 border-gray-500 rounded-md shadow-md">
          <h1 className="text-2xl font-bold">BChaty</h1>

          <div className="flex justify-between mt-4 space-x-2 text-purple-50">
            <button className="px-4 py-1 bg-purple-700 rounded-md" onClick={() => setSelectedAction("signup")}>
              Sign Up 🚀
            </button>
            <button className="px-4 py-1 bg-purple-700 rounded-md" onClick={() => setSelectedAction("login")}>
              Login 🎯
            </button>
          </div>
        </div>

        <SignUp selectAction={selectAction} setSelectAction={setSelectedAction} />
        <Login selectAction={selectAction} setSelectAction={setSelectedAction} />
      </div>
    </main>
  );
}
