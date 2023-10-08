import { useSession } from "next-auth/react";

const AuthUserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  if (status === "unauthenticated")
    return (
      <div className="fixed w-full z-[200] h-full flex items-center justify-center text-center">
        <div className="space-y-6">
          <div id="loader"></div>
          <p>Loading...</p>
        </div>
      </div>
    );

  return <></>;
};

export default AuthUserProvider;
