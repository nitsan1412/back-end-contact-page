const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    id: ObjectId,
    is_active: Boolean,
    email: String,
    password: String,
    user_name: String,
    // pages: [{ type: ObjectId, ref: "Page" }],
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
