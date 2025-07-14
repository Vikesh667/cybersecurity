const { Notification } = require("../model/Notification");

const startNotification = async (req, res) => {
  try {
    const io = req.app.get("io");

    const direction = req.body.direction || "left";

    const notification = await Notification.findByIdAndUpdate(
      "singleton",
      {
        $set: {
          isNotification: true,
          direction: direction,
        },
      },
      { upsert: true, new: true }
    );

    io.emit("notification", {
      isNotification: true,
      direction: notification.direction,
    });

    res.status(200).json({ message: "Notification started", data: notification });
  } catch (error) {
    res.status(500).json({ message: "Error starting notification", error: error.message });
  }
};

const stopNotification = async (req, res) => {
  try {
    const io = req.app.get("io");

    const notification = await Notification.findByIdAndUpdate(
      "singleton",
      { $set: { isNotification: false } },
      { new: true }
    );

    io.emit("notification", {
      isNotification: false,
      direction: notification.direction,
    });

    res.status(200).json({ message: "Notification stopped", data: notification });
  } catch (error) {
    res.status(500).json({ message: "Error stopping notification", error: error.message });
  }
};

const getNotificationStatus = async (req, res) => {
  try {
    const notification = await Notification.findById("singleton");

    if (!notification) {
      return res.status(404).json({ message: "No notification record found" });
    }

    res.status(200).json({ message: "Fetched", data: notification });
  } catch (error) {
    res.status(500).json({ message: "Error getting status", error: error.message });
  }
};

module.exports = {
  startNotification,
  stopNotification,
  getNotificationStatus,
};
