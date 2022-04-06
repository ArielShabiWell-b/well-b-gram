import express from "express";

import signInRouter from "./signin";
import signUpRouter from "./signup";
import verifyRouter from "./verify";

const router = express.Router();

router.use("/signin", signInRouter);
router.use("/signup", signUpRouter);
router.use("/verify", verifyRouter);

export default router;
