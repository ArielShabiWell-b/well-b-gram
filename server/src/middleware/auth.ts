import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verify = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("token");

  if (!token) {
    return res.status(401).json({
      msg: "Access denied - No token provided.",
    });
  }

  const secretOrPublicKey = process.env.JWT_SECRET as string;

  jwt.verify(token, secretOrPublicKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token.",
      });
    }

    const { id } = decoded as { id: string };
    (req as any).user = id;

    return next();
  });
};
