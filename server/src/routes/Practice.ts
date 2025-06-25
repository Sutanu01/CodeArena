import express from "express";
import { SubmitCode,getSubmissions } from "../controllers/sumbitCode.js";
const router = express.Router();

router.post("/sumbit", SubmitCode);

router.get("/get-submissions",getSubmissions);

export default router;
