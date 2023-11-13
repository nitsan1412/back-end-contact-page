const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const Schema = mongoose.Schema;

const parentSchema = new Schema({
  id: ObjectId,
  first_name: String,
  last_name: String,
  phone: String,
  created_at: Date,
  deleted_at: Date,
  updated_at: Date,
});

module.exports = mongoose.model("Parent", parentSchema);
