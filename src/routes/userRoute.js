import express from "express";
import { register,loginUser } from "../controllers/usersControllers/user.auth.controller.js";
const router = express.Router();

// regist
router.post("/register",register );
router.post("/login",loginUser );

export default router;
