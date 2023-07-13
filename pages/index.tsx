import SignUp from "@/components/SignUp";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="p-4 text-center border-2 border-gray-500 rounded-md shadow-md">
          <h1 className="text-2xl font-bold">BChaty</h1>

          <div className="flex justify-between mt-4 space-x-2 text-purple-50">
            <Link href={"/chat"}>
              <button className="px-4 py-1 bg-purple-700 rounded-md">Sign Up 🚀</button>
            </Link>
            <Link href={"/chat"}>
              <button className="px-4 py-1 bg-purple-700 rounded-md">Login 🎯</button>
            </Link>
          </div>
        </div>

        <SignUp />
      </div>
    </main>
  );
}
