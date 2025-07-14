const express=require("express")
const { fetchUserById } = require("../controller/User")
const { protect } = require("../middleware/authMiddleware")
const userRoutersById=express.Router()

userRoutersById.get("/own",protect,fetchUserById)

module.exports={userRoutersById}