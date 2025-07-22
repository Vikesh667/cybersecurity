const express = require("express");
const { userMessage, getAllMessage, deleteMessage } = require("../controller/MessageController");
const messageRouter = express.Router();
messageRouter.post("/message", userMessage);
messageRouter.get("/get-message",getAllMessage)
messageRouter.delete("/message-delete/:id",deleteMessage)
module.exports = { messageRouter };
