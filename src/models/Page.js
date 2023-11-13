const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const Schema = mongoose.Schema;

const pageSchema = new Schema({
  id: ObjectId,
  class_name: String,
  school_name: String,
  address: String,
  school_phone: String,
  manager_name: String,
  starting_year: Number,
  link_for_registration: String,
  page_link: String,
  teachers: [{ type: ObjectId, ref: "Teacher" }],
  kids: [{ type: ObjectId, ref: "Kid" }],
  background_id: ObjectId,
  created_at: Date,
  deleted_at: Date,
  updated_at: Date,
});

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;
