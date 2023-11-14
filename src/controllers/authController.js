const dataAccess = require("../logic/data-access");
const { generateToken } = require("../logic/jwtToken");
const { comparePassword } = require("../logic/comparePassword");
const UserModel = require("../models/User");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if a user with the given email or phone number already exists
    const existingUser = await UserModel.findOne({ email }).populate("pages");
    // .populate("background");
    if (!existingUser) {
      return res.status(400).json({
        error: "User with this email address dosen't exists",
      });
    }
    //check user password
    const isValidPassword = await comparePassword(
      password,
      existingUser.password
    );
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = await generateToken(existingUser._id);
    return res.status(200).send({
      user: {
        _id: existingUser._id,
        user_name: existingUser.user_name,
        email: existingUser.email,
        pages: existingUser.pages,
      },
      token: token,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserInfo = async (req, res) => {
  const { userId } = req.user;
  try {
    // Check if a user with the given email or phone number already exists
    const existingUser = await UserModel.findById(userId).populate("pages");
    // .populate("background");
    if (!existingUser) {
      return res.status(400).json({
        error: "couldn't find user",
      });
    }
    return res.status(200).send({
      user: {
        _id: existingUser._id,
        user_name: existingUser.user_name,
        email: existingUser.email,
        pages: existingUser.pages,
      },
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  const { user_name, email, password } = req.body;
  try {
    // Check if a user with the given email or phone number already exists
    const existingUser = await UserModel.findOne({ email }).populate("pages");
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
      if (newUser["_id"]) {
        const token = await generateToken(newUser._id);
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

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await dataAccess
      .findOneAndUpdate(
        { id: id },
        { deletedAt: new Date(now), is_active: false }
      )
      .then((err, row) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        if (row) {
          res.status(200).json({ message: "Delete successful" });
        }
        return res
          .status(500)
          .json({ error: "no user with this ID in the DB" });
      });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
