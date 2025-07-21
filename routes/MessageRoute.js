const express = require("express");
const { userMessage, getAllMessage } = require("../controller/MessageController");
const messageRouter = express.Router();
messageRouter.post("/message", userMessage);
messageRouter.get("/get-message",getAllMessage)
module.exports = { messageRouter };
