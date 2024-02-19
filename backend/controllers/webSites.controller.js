import Websites from "../models/websites.model.js";

const getAllWebsites = async (req, res) => {
  try {
    const websites = await Websites.find();
    res.json(websites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllWebsites };
