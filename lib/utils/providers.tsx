import AuthUserProvider from "../contexts/authuser-context";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <AuthUserProvider>{children}</AuthUserProvider>;
};

export default Providers;
