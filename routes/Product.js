const express = require("express");
const { createProduct, getProductById, fetchAllProduct } = require("../controller/Product");
const { protect } = require("../middleware/authMiddleware");

const productRouter = express.Router();

productRouter.post("/createproduct", createProduct);
productRouter.get("/product", fetchAllProduct);
productRouter.get("/product/:id",protect, getProductById);
// Register route

module.exports = { productRouter }; // ✅ use default export
