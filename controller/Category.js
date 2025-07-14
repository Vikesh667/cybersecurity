const { Categories } = require("../model/Category");

const createCategory = async (req, res) => {
  try {
    const category = await Categories.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(40).json({ success: false, message: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const Categorie = await Categories.find();
    res.status(200).json({ success: true, data: Categorie });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCategory,
  getCategory,
};
