import express from "express";
import { requireAuth } from "@clerk/express";
import { SubmitCode,getSubmissions } from "../controllers/submitCode.js";
const router = express.Router();

router.post("/submit", requireAuth(), SubmitCode);

router.get("/get-submissions", requireAuth(), getSubmissions);

export default router;
