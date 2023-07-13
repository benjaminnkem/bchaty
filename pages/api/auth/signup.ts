import { dbConnection } from "@/utils/db";
import UsersModel from "@/utils/models/UsersModel";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const userInfo = req.body;
      await dbConnection();
      const users = await UsersModel.create(userInfo);
      console.log("user created successfully");
      res.status(200).json({ message: "Successfully created user" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "The method " + req.method + " is not supported" });
  }
}
