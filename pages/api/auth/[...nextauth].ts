import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        return null;
      }
    }),
  ],
  pages: {
    signIn: "/login"
  }
});
