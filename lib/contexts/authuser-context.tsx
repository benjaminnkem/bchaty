import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthUserContext extends Session {}
const AuthUserContext = createContext<AuthUserContext | null>(null);

const AuthUserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<Session | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session) {
      setUserData(session);
    } else setUserData({} as Session);
  }, [session, status]);

  if (status === "loading")
    return (
      <div className="fixed w-full z-[200] select-none h-full flex items-center justify-center text-center">
        <div className="space-y-6">
          <div id="loader"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );

  return <AuthUserContext.Provider value={userData}>{children}</AuthUserContext.Provider>;
};

export const useUserData = (): AuthUserContext => {
  const context = useContext(AuthUserContext);

  if (!context) throw new Error("useUserData must be used under the AuthUserProvider");
  return context;
};

export default AuthUserProvider;
