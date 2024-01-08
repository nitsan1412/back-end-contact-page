const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const Schema = mongoose.Schema;

const roleSchema = new Schema({
  id: ObjectId,
  name: String,
  translation: String,
  createdAt: Date,
  deletedAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("Role", roleSchema);
