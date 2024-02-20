// webSites.routes.js
import express from "express";
import {
  getAllWebsites,
  getWebsiteById,
} from "../controllers/webSites.controller.js"; // `getWebsiteById` fonksiyonunu da import ettik

const router = express.Router();

// Tüm websitelerini getiren route
router.get("/websites", getAllWebsites);

// Belirli bir ID'ye sahip website'i getiren route
router.get("/websites/:id", getWebsiteById);

export default router;
