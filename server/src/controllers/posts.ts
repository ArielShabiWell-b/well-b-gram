import { Request, Response } from "express";
import {
  getPostsDB,
  addPostDB,
  deletePostDB,
  updatePostStatusDB,
} from "../db/posts";

export const getPosts = async (req: Request, res: Response) => {
  const page = Number(req?.query?.page) || 0;
  const limit = Number(req?.query?.limit) || 1;

  await getPostsDB(page, limit)
    .then((posts) => {
      return res.status(200).json(posts);
    })
    .catch((err) => {
      console.log({ err });
      return res.status(500).json(err);
    });
};

export const addPost = async (req: Request, res: Response) => {
  const text = req.body.text;
  const files = (req.files as Array<Express.Multer.File>).map(
    (file: Express.Multer.File) => file.path
  );
  const createdAt = new Date();
  const status = Number(req.body.status) || 0;
  const userId = (req as any).user;

  await addPostDB({ text, files, createdAt, status, userId })
    .then((post) => {
      return res.status(200).json(post);
    })
    .catch((err) => {
      console.log({ err });
      return res.status(500).json(err);
    });
};

export const deletePost = async (req: Request, res: Response) => {
  const postId = req.params.postId;

  await deletePostDB(postId)
    .then((post) => {
      return res.status(200).json(post);
    })
    .catch((err) => {
      console.log({ err });
      return res.status(500).json(err);
    });
};

export const updatePostStatus = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const status = Number(req.body.status) || 0;

  await updatePostStatusDB(postId, status)
    .then((post) => {
      return res.status(200).json(post);
    })
    .catch((err) => {
      console.log({ err });
      return res.status(500).json(err);
    });
};
