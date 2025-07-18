const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../model/User");
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hassPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hassPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User created", newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const checkAuth = async (req, res) => {
  try {
    res.json(req.user); 
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};




module.exports = {
  createUser,
  login,
  checkAuth
};
