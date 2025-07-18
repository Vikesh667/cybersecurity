const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: "singleton", 
    },
    isNotification: {
      type: Boolean,
      required: true,
      default: false,
    },
    direction: {
      type: String,
      enum: ["left", "right"],
      default: "left",
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = { Notification };
