const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const pageSchema = new mongoose.Schema(
  {
    id: ObjectId,
    class_name: String,
    school_name: String,
    address: String,
    school_phone: String,
    manager_name: String,
    starting_year: Number,
    link_for_registration: { type: String, default: null },
    page_link: { type: String, default: null },
    // teachers: [{ type: ObjectId, ref: "Teacher" }],
    // kids: [{ type: ObjectId, ref: "Kid" }],
    // background_id: ObjectId,
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;
