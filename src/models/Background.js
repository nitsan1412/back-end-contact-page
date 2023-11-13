const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const Schema = mongoose.Schema;

const backgroundSchema = new Schema({
  id: ObjectId,
  name: String,
  link: String,
  created_at: Date,
  deleted_at: Date,
  updated_at: Date,
});

module.exports = mongoose.model("Background", backgroundSchema);
