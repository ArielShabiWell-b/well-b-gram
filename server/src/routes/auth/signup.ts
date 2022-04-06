import express from "express";
import { addUser } from "../../controllers/users";

const router = express.Router();

router.post("/", addUser);

export default router;
