
const express = require("express");
const { createUser, login, checkAuth } = require("../controller/Auth");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/check",protect,checkAuth)

module.exports = { router }; // ✅ use default export
