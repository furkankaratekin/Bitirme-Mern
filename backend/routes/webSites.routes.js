import express from "express";
import { getAllWebsites } from "../controllers/websites.controller.js"; // Adjust the path as necessary

const router = express.Router();

router.get("/websites", getAllWebsites);

export default router;
