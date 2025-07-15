const express=require("express")
const { popupController, updatePopupPostion, getPosition } = require("../controller/PopController")
const popRouter=express.Router()

popRouter.post("/popup",popupController)
popRouter.patch("/popup",updatePopupPostion)
popRouter.get("/getpops",getPosition)

module.exports={popRouter}