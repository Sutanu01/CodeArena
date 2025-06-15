import express from "express";
import { getUserData,unlinkCodeforces } from "../controllers/user.js";

const router = express.Router();


router.get("/get-user", getUserData);

router.post("/unlink-cf",unlinkCodeforces);

export default router;
