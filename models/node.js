const mongoose = require("mongoose");

const nodeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: false },
  value: { type: Number },
  root: { type: String, required: true, unique: false },
  adjacents: { type: Array, required: true },
});

module.exports = mongoose.model("Node", nodeSchema);
