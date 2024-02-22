import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  addFavorite,
  removeFavorite
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.post("/users/:userId/favorites", addFavorite);
router.delete("/users/:userId/favorites/:websiteId", removeFavorite);

export default router;
