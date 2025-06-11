import express from "express";
import { getUserData, handleClerkUserChange } from "../controllers/user.js";

const router = express.Router();


router.get("/get-user", getUserData);

export default router;
