import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Chat</h1>

      <Link href={"/chat"}>
        <button className="px-4 py-1 mt-4 bg-purple-700 text-purple-50">Go to chat</button>
      </Link>
    </main>
  );
}
