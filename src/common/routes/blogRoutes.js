import express from "express";
import {
  create,
  getAll,
  getById,
  update,
  deleteById,
} from "../controllers/blogController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const router = express.Router();

// Define API Endpoints for Blog
router.post("/create", authMiddleware, create);
router.get("/getAll", authMiddleware, getAll);
router.get("/get/:id", authMiddleware, getById);
router.put("/update/:id", authMiddleware, update);
router.delete("/delete/:id", authMiddleware, deleteById);

// Alternatively, you can use the .route() method to chain all the HTTP verbs together
// router.route('/').get(getAll).post(create);
// router.route('/:id').get(getById).put(update).delete(deleteById);

export default router;
