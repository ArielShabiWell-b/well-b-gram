import express from "express";

import postsRouter from "./posts";
import commentsRouter from "./comments";
import authRouter from "./auth";

const router = express.Router();

import { verify } from "../middleware/auth";

router.use("/auth", authRouter);
router.use("/posts", verify, postsRouter);
router.use("/comments", verify, commentsRouter);

export default router;
