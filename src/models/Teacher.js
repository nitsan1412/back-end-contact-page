const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  id: ObjectId,
  role: { type: ObjectId, ref: "Role" },
  first_name: String,
  last_name: String,
  picture: String,
  phone: String,
  birth_date: String,
  created_at: Date,
  deleted_at: Date,
  updated_at: Date,
});

module.exports = mongoose.model("Teacher", teacherSchema);
