const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const { Page } = require("./Page");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    id: ObjectId,
    is_active: Boolean,
    email: String,
    password: String,
    user_name: String,
    pages: [{ type: Schema.Types.ObjectId, ref: "Page" }],
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
