"use client";
import React, { Dispatch, SetStateAction, useState } from "react";

type NewUser = {
  username: string;
  password: string;
};

type SignUpProps = {
  selectAction: string;
  setSelectAction: Dispatch<SetStateAction<string>>;
};

const SignUp = ({ selectAction, setSelectAction }: SignUpProps) => {
  const [err, setErr] = useState<NewUser>({} as NewUser);
  const [inputs, setInputs] = useState<NewUser>({ username: "", password: "" });
  const [status, setStatus] = useState<{ loading: boolean }>({ loading: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const validateInput = () => {
    const errors = {} as NewUser;
    if (!inputs.username) {
      errors.username = "Please enter a username";
    }

    if (!inputs.password) {
      errors.password = "Please enter a password";
    } else if (inputs.password.length < 8) {
      errors.password = "Password cannot be less than 8 characters";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ loading: true });

    const validator = validateInput();
    setErr(validator);

    if (Object.keys(err).length > 0) {
      console.log(err);
      setStatus({ loading: false });
      return;
    } else {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: inputs.username, password: inputs.password }),
      });

      if (!res.ok) {
        setStatus({ loading: false });
        console.log("An error occurred");
      }

      console.log("successful");
      setInputs({ username: "", password: "" });
      setStatus({ loading: false });
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full duration-200 bg-black bg-opacity-90 overflow-hidden ${
          selectAction === "signup" ? "w-full" : "w-[.25px]"
        }`}
      >
        <div className="grid w-full h-full place-content-center">
          <div className="p-4 border-2 border-gray-500 rounded-md min-w-[350px]">
            <h2 className="py-1 mb-2 font-bold text-end">Sign Up</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="space-y-4">
                <div>
                  <label className="text-lg font-semibold" htmlFor="signUpUsername">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="signUpUsername"
                    autoComplete="off"
                    className={`block p-1 text-gray-300 bg-transparent border-b w-full focus:outline-none ${
                      err.username ? "border-b-red-500" : "border-b-gray-500"
                    }`}
                    value={inputs.username}
                    onChange={(e) => handleChange(e)}
                    maxLength={20}
                  />
                  {err.username && <p className="text-xs font-semibold text-red-500">{err.username}</p>}
                </div>
                <div>
                  <label className="text-lg font-semibold" htmlFor="signUpPassword">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="signUpPassword"
                    value={inputs.password}
                    autoComplete="off"
                    className={`block p-1 text-gray-300 bg-transparent border-b w-full focus:outline-none ${
                      err.password ? "border-b-red-500" : "border-b-gray-500"
                    }`}
                    onChange={(e) => handleChange(e)}
                  />
                  {err.password && <p className="text-xs font-semibold text-red-500">{err.password}</p>}
                </div>

                <button
                  className="w-full py-1 duration-200 bg-gray-600 rounded-md hover:bg-gray-700 disabled:bg-gray-400"
                  disabled={status.loading ? true : false}
                >
                  {status.loading ? "Validating..." : "Sign Up"}
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
                onClick={() => setSelectAction("login")}
              >
                Login
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
