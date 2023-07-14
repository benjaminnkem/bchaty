import { dbConnection } from "@/utils/db";
import UsersModel from "@/utils/models/UsersModel";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    Credentials({
      type: "credentials",
      credentials: {},
      async authorize(credentials, _req) {
        try {
          const { username, password } = credentials;
          await dbConnection();
          const user = await UsersModel.findOne({ username: username });
          if (!user || user.length === 0) {
            throw new Error(`The username ${username} does not exist`);
          }

          const passwordMatch = await compare(password as string, user.password);
          if (!passwordMatch) {
            throw new Error("The password is incorrect");
          }

          return { id: user.id, name: user.username, email: user.email }; // returning a unique cookie object
        } catch (e) {
          console.log(e);
          throw new Error("Login Failed, re-check credentials 😣");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
