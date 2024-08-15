import express from "express";
import {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router();

//routes
//GET USER || GET
router.get("/getUser", authMiddleware, adminMiddleware, getUserController);

// UPDATE USER PROFILE || PUT
router.put("/updateUser", authMiddleware, updateUserController);

// PASSWORD UPDATE || POST
router.post("/updatePassword", authMiddleware, updatePasswordController);

// RESET PASSWORD || POST
router.post("/resetPassword", authMiddleware, resetPasswordController);

// DELETE USER || DELETE
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController);

export default router;
