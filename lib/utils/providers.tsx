import AuthUserProvider from "../contexts/authuser-context";
import SidebarProvider from "../contexts/chat/sidebar-context";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthUserProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </AuthUserProvider>
  );
};

export default Providers;
