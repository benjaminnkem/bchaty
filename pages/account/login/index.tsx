"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "../register/(styles)/index.module.css";
import CircleLoader from "@/components/Common/Loader/circlce-loader";
import Head from "next/head";
import { useUserData } from "@/lib/contexts/authuser-context";

type LogInfo = {
  email: string;
  password: string;
};

const Login = () => {
  const [inputs, setInputs] = useState<LogInfo>({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false });
  const router = useRouter();
  const { user } = useUserData();

  if (user) {
    router.replace("/chat");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ loading: true });

    const res = await signIn("credentials", { ...inputs, redirect: false }).finally(() =>
      setStatus({ loading: false })
    );

    if (res?.status === 401) {
      console.log("unauthenticated");
      return;
    }

    router.push("/chat");
  };

  return (
    <>
      <Head>
        <title>Login - BChaty</title>
      </Head>
      {status.loading && <CircleLoader />}
      <div className={`grid grid-cols-5 min-h-screen`}>
        <div className="relative overflow-hidden text-white col-span-3">
          <div className="absolute top-0 left-0 w-full h-full">
            <Image
              src={"/images/backgrounds/bitcoin.jpg"}
              alt="Bit"
              width={1024}
              height={1024}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`${styles.signupSideOverlay} absolute top-0 left-0 w-full h-full`}></div>
          <div className="absolute top-0 left-0 w-full h-full p-10">
            <h1 className="font-semibold text-3xl">
              Bchaty<span className="text-purple-800">.</span>
            </h1>

            <div className="mt-20 space-y-6">
              <div className="max-w-sm p-1 border border-white/40 rounded-md">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat et, omnis vero repellendus illo,
                  architecto fugit!
                </p>
              </div>
              <div className="max-w-sm p-1 ml-8 border border-white/40 rounded-md">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat et, omnis vero repellendus illo,
                  architecto fugit!
                </p>
              </div>
              <div className="max-w-sm p-1 ml-16 border border-white/40 rounded-md">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat et, omnis vero repellendus illo,
                  architecto fugit!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:p-10 lg:p-8 border bg-white shadow-lg border-gray-200 dark:bg-slate-800 rounded-lg col-span-2">
          <h2 className="py-1 mb-2 text-3xl font-bold text-center">Login</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="space-y-4 mt-4">
              <div className="space-y-1">
                <label className="font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  className={`block p-2 text-gray-700 dark:text-gray-300 bg-transparent border rounded-md w-full focus:outline-none`}
                  placeholder="Enter email"
                  maxLength={20}
                  value={inputs.email}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={inputs.password}
                  onChange={(e) => handleChange(e)}
                  autoComplete="off"
                  className={`block p-2 text-gray-700 dark:text-gray-300 bg-transparent border rounded-md w-full focus:outline-none`}
                  placeholder="************"
                />
              </div>

              <div>
                <label htmlFor="terms" className="flex items-center gap-1">
                  <input type="checkbox" name="terms" id="terms" />
                  <span>
                    You accept our <span className="font-semibold text-purple-700">Terms</span> and{" "}
                    <span className="font-semibold text-purple-700">Conditions</span>
                  </span>
                </label>
              </div>

              <button
                className="w-full py-1 md:py-2 duration-200 dark:bg-gray-600 rounded-md dark:hover:bg-gray-700 
                  border-2 border-purple-700 text-purple-50 transition-colors bg-purple-700 hover:bg-purple-600 disabled:bg-gray-400"
                disabled={status.loading ? true : false}
              >
                {status.loading ? "Validating..." : "Sign Up"}
              </button>
            </div>
          </form>

          <p className="mt-2">
            Don&apos;t have an account?{" "}
            <Link
              href={"/account/register"}
              className="mt-1 font-semibold text-center dark:text-purple-400 text-purple-700 cursor-pointer my-2"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
