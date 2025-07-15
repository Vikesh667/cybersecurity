const jwt = require("jsonwebtoken");
const {User} = require("../model/User"); 
const SECRET_KEY = "MY_SECRET_KEY";

exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
   const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // ✅ Now available in checkAuth
    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
