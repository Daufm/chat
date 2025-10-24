
import express from "express";
import {
  registerUser,
  loginUser,
  verifyUser
} from "../controllers/user.controller.js";



const router = express.Router();

router.post("/users/register", registerUser);
router.post("/users/login", loginUser);
router.post("/verify", verifyUser);

export default router;
