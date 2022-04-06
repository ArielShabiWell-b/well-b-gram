import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { getUserByUsernameDB } from "../db/users";

export const validateUser = async (req: Request, res: Response) => {
  const reqData = {
    username: req.body?.username,
    password: req.body?.password,
  };

  const { username, password } = reqData;

  if (!username || !password) {
    return res.status(400).json({
      message: "Please provide all required fields.",
    });
  }

  getUserByUsernameDB(username)
    .then((user) => {
      if (!user) throw new Error("User not found.");

      console.log(user);
      const isPasswordValid = bcryptjs.compareSync(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({
          message: "Invalid password.",
        });
      }

      const secretOrPrivateKey = process.env.JWT_SECRET as string;
      const token = jwt.sign({ id: user.id }, secretOrPrivateKey);

      return res.json({
        success: true,
        message: "User logged in successfully.",
        token,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Error Login user.",
        error: err.message,
      });
    });
};
