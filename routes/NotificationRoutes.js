const express=require("express")
const { startNotification, stopNotification, getNotificationStatus } = require("../controller/Notification")
const notificationRouters=express.Router()

notificationRouters.post('/start',startNotification)
notificationRouters.post('/stop',stopNotification)
notificationRouters.get("/status",getNotificationStatus)

module.exports={notificationRouters}