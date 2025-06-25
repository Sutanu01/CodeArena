import express from "express";
import { SubmitCode } from "../controllers/sumbitCode.js";
const router = express.Router();

router.post("/sumbit", SubmitCode);

export default router;
