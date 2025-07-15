const mongoose = require("mongoose");

const popupSchema = new mongoose.Schema({
  position: {
    top: Number,
    left: Number,
    text:String
  },
});

const Popup = mongoose.model("Popup", popupSchema);
module.exports = { Popup };
