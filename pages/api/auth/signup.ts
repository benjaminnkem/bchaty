import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { dbConnection } from "@/lib/utils/mongoConnection";
import UsersModel from "@/lib/utils/models/UsersModel";

export default async function handler(req: NextRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const userInfo = req.body as any;
      await dbConnection();

      const hashedPassword = await bcryptjs.hash(userInfo.password, 12);
      await UsersModel.create({ ...userInfo, password: hashedPassword });
      res.status(200).json({ message: "Successfully created user" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "The method " + req.method + " is not supported" });
  }
}
