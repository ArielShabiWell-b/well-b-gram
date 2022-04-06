import { Request, Response } from "express";
import { getCommentsDB, addCommentDB } from "../db/comments";

export const getComments = async (req: Request, res: Response) => {
  const postId: string = req.query.postId as string;

  if (!postId) return res.status(400).json({ message: "postId is required" });

  await getCommentsDB(postId)
    .then((comments) => {
      return res.status(200).json(comments);
    })
    .catch((err) => {
      console.log({ err });
      return res.status(500).json(err);
    });
};

export const addComment = async (req: Request, res: Response) => {
  const postId: string = req.body.postId as string;
  const text: string = req.body.text;
  const createdAt = new Date();
  const userId = (req as any).user;

  if (!postId) return res.status(400).json({ message: "postId is required" });
  if (!text) return res.status(400).json({ message: "text is required" });

  await addCommentDB(postId, { text, createdAt, userId })
    .then((comment) => {
      return res.status(200).json(comment);
    })
    .catch((err) => {
      console.log({ err });
      return res.status(500).json(err);
    });
};
