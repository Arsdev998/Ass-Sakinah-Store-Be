import express from "express";
import {
  register,
  loginUser,
  sendEmailControll,
  logourUser,
} from "../controllers/usersControllers/user.auth.controller.js";
import {
    deleteUser,
  getAllUser,
  getUserProfile,
  updateUser,
} from "../controllers/usersControllers/user.action.controller.js";
import { authentication } from "../middleware/middleware.js";
const router = express.Router();

// auth
router.post("/auth/register", register);
router.post("/auth/login", loginUser);
router.post("/auth/send-email",sendEmailControll)
router.post("/auth/logout", logourUser)
// user action
router.get("/user/profile", authentication(["admin", "user"]), getUserProfile);
router.patch("/user/update", authentication(["admin", "user"]), updateUser);
router.get("/users/get", authentication(["admin"]), getAllUser);
router.delete("/user/delete/:id", authentication(["admin"]), deleteUser);


export default router;
