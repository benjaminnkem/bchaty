"use client";
import { signIn } from "next-auth/react";
import React, { Dispatch, SetStateAction, useState } from "react";

type LogInfo = {
  username: string;
  password: string;
};

type LoginProps = {
  selectAction: string;
  setSelectAction: Dispatch<SetStateAction<string>>;
};

const Login = ({ selectAction, setSelectAction }: LoginProps) => {
  const [inputs, setInputs] = useState<LogInfo>({ username: "", password: "" });
  const [status, setStatus] = useState<{ loading: boolean }>({ loading: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ loading: true });

    console.log("something");
    await signIn("credentials", { username: inputs.username, password: inputs.password });
    setStatus({ loading: false });
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full duration-200 bg-black bg-opacity-90 overflow-hidden ${
          selectAction === "login" ? "w-full" : "w-[.25px]"
        }`}
      >
        <div className="grid w-full h-full place-content-center">
          <div className="p-4 border-2 border-gray-500 rounded-md min-w-[350px]">
            <h2 className="py-1 mb-2 font-bold text-end">Login</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="space-y-4">
                <div>
                  <label className="text-lg font-semibold" htmlFor="username">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="off"
                    className={`block p-1 text-gray-300 bg-transparent border-b-gray-500 border-b w-full focus:outline-none`}
                    value={inputs.username}
                    onChange={(e) => handleChange(e)}
                    maxLength={20}
                  />
                </div>
                <div>
                  <label className="text-lg font-semibold" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
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

            <div className="flex items-center justify-center space-x-2 select-none">
              <p
                className="mt-1 text-xs font-semibold text-center cursor-pointer"
                onClick={() => setSelectAction("none")}
              >
                Close
              </p>

              <p
                className="mt-1 text-xs font-semibold text-center text-purple-400 cursor-pointer"
                onClick={() => setSelectAction("signup")}
              >
                Sign Up
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
