const jwt = require("jsonwebtoken");
const {User} = require("../model/User"); 

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

    req.user = user; 
    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
exports.isAdmin = (req, res, next) => {
  console.log(req.user.role)
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

