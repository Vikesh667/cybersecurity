const express=require("express")
const upload = require("../middleware/multer")
const { imageUpload, getAllMarqueImage } = require("../controller/photoController")
const photosRouter=express.Router()

photosRouter.post("/uplod",upload.single("image"),imageUpload)
photosRouter.get("/marquee",getAllMarqueImage)
module.exports=photosRouter