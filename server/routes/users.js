import express from "express";
import { getUser } from "../controllers/user.js";

const router = express.Router();

router.get("/fint/:userId", getUser)

export default router;
