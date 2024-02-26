import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  addFavorite,
  removeFavorite,
  listFavorites
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.post("/:userId/favorites", addFavorite);
router.post("/:userId/remove-favorite",removeFavorite)
router.get("/:userId/list-favorite",listFavorites)
// router.delete("/users/:userId/favorites/:websiteId", removeFavorite);
export default router;
