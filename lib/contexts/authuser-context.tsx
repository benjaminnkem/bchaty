import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthUserContext extends Session {}
const AuthUserContext = createContext<AuthUserContext | null>(null);

const AuthUserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<Session | null>(null);

  useEffect(() => {
    setUserData(session);
  }, [userData, session, status]);

  if (status === "loading")
    return (
      <div className="fixed w-full z-[200] select-none h-full flex items-center justify-center text-center">
        <div className="space-y-6">
          <div id="loader"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );

  return <div>{children}</div>;
};

export const useUserData = (): AuthUserContext => {
  const context = useContext(AuthUserContext);
  if (!context) throw new Error("useUserData must be used under the AuthUserProvider");
  return context;
};

export default AuthUserProvider;
