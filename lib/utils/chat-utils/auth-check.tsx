import { ReactNode } from "react";
import { useUserData } from "../../contexts/authuser-context";
import { useRouter } from "next/router";

const ChatAuthCheck = ({ children }: { children: ReactNode }) => {
  const { user } = useUserData();
  const router = useRouter();

  console.log("user", user);

  if (!user) {
    router.push("/account/login");
    return;
  }

  return <>{children}</>;
};

export default ChatAuthCheck;
