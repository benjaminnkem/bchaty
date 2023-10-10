import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { dbConnection } from "@/lib/utils/mongoConnection";
import UsersModel from "@/lib/utils/models/UsersSchema";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      type: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials, _req) {
        try {
          const email = credentials!.email;
          const password = credentials!.password;
          await dbConnection();
          const user = await UsersModel.findOne({ email });
          if (!user) {
            throw new Error(`The email ${email} does not exist`);
          }

          const passwordMatch = await compare(password as string, user.password);
          if (!passwordMatch) {
            throw new Error("The password is incorrect");
          }

          return { id: user.id, name: user.username, email: user.email }; // returning a unique cookie object
        } catch (e) {
          console.log(e);
          throw new Error("Login Failed, please try again.");
        }
      },
    }),
  ],
  pages: {
    signIn: "/account/login",
    error: "/account/login",
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
