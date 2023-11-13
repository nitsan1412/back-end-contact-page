const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const Schema = mongoose.Schema;

const kidSchema = new Schema({
  id: ObjectId,
  parents: [{ type: ObjectId, ref: "Parent" }],
  first_name: String,
  last_name: String,
  picture: String,
  birth_date: String,
  created_at: Date,
  deleted_at: Date,
  updated_at: Date,
});

module.exports = mongoose.model("Kid", kidSchema);
