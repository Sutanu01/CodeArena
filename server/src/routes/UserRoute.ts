import express from "express";
import { requireAuth } from "@clerk/express";
import { getUserData,unlinkCodeforces } from "../controllers/user.js";

const router = express.Router();


router.get("/get-user", requireAuth(), getUserData);

router.post("/unlink-cf", requireAuth(), unlinkCodeforces);

export default router;
