const dataAccess = require("../logic/data-access");
const { generateToken } = require("../logic/jwtToken");
const comparePassword = require("../logic/comparePassword");
const UserModel = require("../models/User");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if a user with the given email or phone number already exists
    const existingUser = await UserModel.findOne({ email, password })
      // .populate("pages")
      .exec();
    if (!existingUser) {
      return res.status(400).json({
        error: "User dosen't exists",
      });
    }

    const token = await generateToken({
      id: existingUser._id,
      username: existingUser.user_name,
    });
    return res
      .status(200)
      .send({ user: existingUser, token: token, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  const { user_name, email, password } = req.body;
  try {
    // Check if a user with the given email or phone number already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(501).json({
        error: "User with the same email already exists",
      });
    } else {
      const newUser = await UserModel.create({
        user_name,
        email,
        password,
      });
      await console.log(newUser);
      if (newUser["_id"]) {
        const token = await generateToken({
          id: newUser._id,
          username: newUser.user_name,
        });
        return await res
          .status(200)
          .json({ user: newUser, token: token, success: true });
      }
    }
    // res.status(201).json(user);
  } catch (error) {
    await res.status(502).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await dataAccess.deleteItem("user", id.toString()).then((err, row) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (row) {
        res.status(200).json({ message: "Delete successful" });
      }
      return res.status(500).json({ error: "no user with this ID in the DB" });
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
