const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const Schema = mongoose.Schema;

const roleSchema = new Schema({
  id: ObjectId,
  name: String,
  translation: String,
  created_at: Date,
  deleted_at: Date,
  updated_at: Date,
});

module.exports = mongoose.model("Role", roleSchema);
