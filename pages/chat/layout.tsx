import AuthUserProvider from "@/lib/contexts/authuser-context";
import ChatAuthCheck from "@/lib/utils/chat-utils/auth-check";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthUserProvider>
      <ChatAuthCheck>{children}</ChatAuthCheck>
    </AuthUserProvider>
  );
};

export default Layout;
