import express from "express";
import { validateUser } from "../../controllers/auth";

const router = express.Router();

router.post("/", validateUser);

export default router;
