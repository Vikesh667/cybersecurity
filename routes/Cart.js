const express=require("express")
const { protect } = require("../middleware/authMiddleware")
const { addToCart, fetchCartByUser, deleteCart, updateCart } = require("../controller/Cart")
const cartRoutes=express.Router()

cartRoutes.post("/cart",protect,addToCart)
cartRoutes.get("/cart",protect,fetchCartByUser)
cartRoutes.delete("/cart/:id",protect,deleteCart)
cartRoutes.patch("/cart/:id",updateCart)

module.exports={cartRoutes}