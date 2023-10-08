"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

type LogInfo = {
  username: string;
  password: string;
};

const Login = () => {
  const [inputs, setInputs] = useState<LogInfo>({ username: "", password: "" });
  const [status, setStatus] = useState({ loading: false });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ loading: true });

    console.log("something");
    await signIn("credentials", { username: inputs.username, password: inputs.password });
    setStatus({ loading: false });

    router.push("/chat");
  };

  return (
    <>
      <div className={`fixed top-0 right-0 h-full duration-200 bg-slate-900 bg-opacity-90 overflow-hidden w-full`}>
        <div className="grid w-full h-full place-content-center">
          <div className="p-4 border-2 bg-slate-800 rounded-md min-w-[350px]">
            <h2 className="py-1 mb-2 font-bold text-end">Login</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="space-y-4">
                <div>
                  <label className="text-lg font-semibold" htmlFor="loginUsername">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="loginUsername"
                    autoComplete="off"
                    className={`block p-1 text-gray-300 bg-transparent border-b-gray-500 border-b w-full focus:outline-none`}
                    value={inputs.username}
                    onChange={(e) => handleChange(e)}
                    maxLength={20}
                  />
                </div>
                <div>
                  <label className="text-lg font-semibold" htmlFor="loginPassword">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="loginPassword"
                    value={inputs.password}
                    autoComplete="off"
                    className={`block p-1 text-gray-300 bg-transparent border-b-gray-500 border-b w-full focus:outline-none`}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <button
                  className="w-full py-1 duration-200 bg-gray-600 rounded-md hover:bg-gray-700 disabled:bg-gray-400"
                  disabled={status.loading ? true : false}
                >
                  {status.loading ? "Validating..." : "Login"}
                </button>
              </div>
            </form>

            <Link
              href={"/account/register"}
              className="mt-1 text-xs font-semibold text-center text-purple-400 my-2 cursor-pointer"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
