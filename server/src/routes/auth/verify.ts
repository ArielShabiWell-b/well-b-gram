import express from "express";
import { verify } from "../../middleware/auth";
const router = express.Router();

router.post("/", verify, (req, res) => {
  const { token } = req.body;

  return res.json({
    success: true,
    message: "User logged in successfully.",
    token,
  });
});

export default router;
