const { log } = require("console");
const dataAccess = require("../logic/data-access");
const PageModel = require("../models/Page");
const UserModel = require("../models/User");
const { createLinks } = require("../logic/createLinks");

exports.getAllPagesForUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const existiongUser = await UserModel.findOne({
      _id: userId,
      deletedAt: null,
    }).populate({
      path: "pages",
      populate: { path: "teachers" },
    });
    if (existiongUser) {
      return res
        .status(200)
        .send({ pages: existiongUser.pages, success: true });
    } else return res.status(400).json({ error: "user not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPages = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if a user with the given email or phone number already exists
    const existingUser = await UserModel.findOne({ email, password }).populate(
      "pages"
    );
    // .populate("background");
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

exports.getPage = async (req, res) => {
  try {
    // Check if a user with the given email or phone number already exists
    const existingPage = await PageModel.findOne().populate("background");
    //.populate("kids");
    //.populate("teachers");

    if (!existingPage) {
      return res.status(400).json({
        error: "Page dosen't exists",
      });
    }
    return res.status(200).send({ page: existingPage, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  const {
    class_name,
    school_name,
    address,
    school_phone,
    principal_name,
    starting_year,
    user_id,
  } = req.body;
  try {
    const newPage = await PageModel.create({
      class_name,
      school_name,
      address,
      school_phone,
      principal_name,
      starting_year,
    });
    if (newPage["_id"]) {
      const newStudentsLink = await createLinks(newPage["_id"], false);
      const updatedPage = await PageModel.findOneAndUpdate(
        { _id: newPage["_id"] },
        { link_for_registration: newStudentsLink },
        { returnOriginal: false }
      );
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: user_id },
        { $push: { pages: updatedPage } },
        { returnOriginal: false }
      ).populate({
        path: "pages",
        populate: { path: "teachers" },
      });
      return await res.status(200).json({ user: updatedUser });
    }
  } catch (error) {
    console.log("in error", error);
    await res.status(502).json({ error: error.message });
  }
};

// exports.updatePage = async (req, res) => {
//   const { user_name, email, password } = req.body;
//   try {
//     // Check if a user with the given email or phone number already exists
//     const existingPage = await PageModel.findOne().lean();
//     if (existingPage) {
//       return res.status(501).json({
//         error: "User with the same email already exists",
//       });
//     } else {
//       const newPage = await PageModel.create({
//         user_name,
//         email,
//         password,
//       });
//       await console.log(newPage);
//       if (newPage["_id"]) {
//         const token = await generateToken({
//           id: newPage._id,
//           username: newPage.user_name,
//         });
//         return await res
//           .status(200)
//           .json({ page: newPage, token: token, success: true });
//       }
//     }
//     // res.status(201).json(user);
//   } catch (error) {
//     await res.status(502).json({ error: error.message });
//   }
// };

exports.deletePage = async (req, res) => {
  try {
    const { id } = req.params;
    await PageModel.findOneAndUpdate(
      { id: id },
      { deletedAt: new Date(now) }
    ).then((err, row) => {
      if (err) return res.status(500).json({ error: err });
      else {
        return res.status(200).json({ message: "Delete successful" });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
