const express=require("express")
const { fetchUserById, fetchAllUser, deleteUser, getUserById, updateUserById } = require("../controller/User")
const { protect, isAdmin } = require("../middleware/authMiddleware")
const upload = require("../middleware/multer")
const userRoutersById=express.Router()

userRoutersById.get("/own",protect,fetchUserById)
userRoutersById.get("/users",fetchAllUser)
userRoutersById.get("/users/:id",getUserById)
userRoutersById.patch("/users/update/:id",upload.single("image"), updateUserById)
userRoutersById.delete("/users/:id",protect,deleteUser)

module.exports={userRoutersById}