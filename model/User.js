const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    lowercase: true,
    required: true,
  },
  image: {
    type: String, // This will store the Cloudinary image URL
    default: "",   // Optional: fallback if no image is uploaded
  }
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
