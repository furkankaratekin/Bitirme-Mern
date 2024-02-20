// webSites.controller.js
import Websites from "../models/websites.model.js";

// Mevcut fonksiyonunuz
const getAllWebsites = async (req, res) => {
  try {
    const websites = await Websites.find();
    res.json(websites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ID'ye göre website arama fonksiyonu

const getWebsiteById = async (req, res) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id, 10); // String olarak alınan 'id'yi sayıya çeviriyoruz

    // MongoDB'de sayısal 'id' alanına göre sorgu yapıyoruz
    const website = await Websites.findOne({ id: numericId });

    if (!website) {
      return res.status(404).json({ message: "Website not found" });
    }
    res.json(website);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllWebsites, getWebsiteById };
