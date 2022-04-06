import express from "express";
import {
  getPosts,
  deletePost,
  addPost,
  updatePostStatus,
} from "../controllers/posts";
import uploadFiles from "../middleware/uploadFiles";

const router = express.Router();

router.get("/", getPosts);
router.post("/", uploadFiles, addPost);
router.delete("/:postId", deletePost);
router.patch("/:postId", updatePostStatus);

export default router;
