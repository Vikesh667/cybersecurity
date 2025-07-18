const express = require("express");
const { getCategory, createCategory } = require("../controller/Category");

const categoryRouter = express.Router();
categoryRouter.post("/category",createCategory)
categoryRouter.get("/categories", getCategory);



module.exports = { categoryRouter  }; // ✅ use default export
