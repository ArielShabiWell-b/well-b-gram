import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { getUserDB, addUserDB, deleteUserDB } from "../db/users";

export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  await getUserDB(userId)
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      console.log({ err });
      return res.status(500).json(err);
    });
};

export const addUser = async (req: Request, res: Response) => {
  const userReq = {
    username: req.body?.username,
    password: req.body?.password,
    email: req.body?.email,
  };

  const { username, password, email } = userReq;
  if (!username || !password || !email) {
    return res.status(400).json({
      message: "Please provide all required fields.",
    });
  }

  await addUserDB(userReq)
    .then((user) => {
      const secretOrPrivateKey = process.env.JWT_SECRET as string;
      const token = jwt.sign({ id: user.id }, secretOrPrivateKey);

      return res.status(201).json({
        success: true,
        message: "User created successfully.",
        token,
      });
    })
    .catch((err) => {
      console.log({ err });
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    });
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  await deleteUserDB(userId)
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      console.log({ err });
      return res.status(500).json(err);
    });
};
