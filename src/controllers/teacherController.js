const dataAccess = require("../logic/data-access");
const PageModel = require("../models/Page");
const TeacherModel = require("../models/Teacher");
const RoleModel = require("../models/Role");

exports.getAllRoles = async (req, res) => {
  console.log("in get all roles");
  try {
    const allActiveRoles = await RoleModel.find({ deletedAt: null });
    if (!allActiveRoles) {
      return res.status(400).json({
        error: "Can't find roles",
      });
    }
    return res.status(200).send({ roles: allActiveRoles, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const doesTeacherExist = async (currentPage, first_name, last_name) => {
  let response = false;
  await currentPage.teachers.forEach((teacher) => {
    if (teacher.first_name === first_name && teacher.last_name === last_name)
      response = true;
  });
  return response;
};

exports.create = async (req, res) => {
  const { role, first_name, last_name, phone, picture, birth_date } = req.body;
  const { pageId } = req.params;
  const currentPage = await PageModel.findOne({ _id: pageId }).populate(
    "teachers"
  );
  const allreadyExist = await doesTeacherExist(
    currentPage,
    first_name,
    last_name
  );
  if (allreadyExist) {
    res
      .status(405)
      .json({ error: "This teacher is allreay registered in this page" });
  } else {
    try {
      const newTeacher = await TeacherModel.create({
        role,
        first_name,
        last_name,
        phone,
        picture,
        birth_date,
      });
      if (newTeacher["_id"]) {
        const updatedPage = await PageModel.findOneAndUpdate(
          { _id: pageId },
          { $push: { teachers: newTeacher } },
          { returnOriginal: false }
        ).populate("teachers");
        return await res.status(200).json({ teacher: newTeacher });
      }
    } catch (error) {
      await res.status(502).json({ error: error.message });
    }
  }
};

exports.createRole = async (req, res) => {
  const { name, translation } = req.body;

  try {
    const newRole = await RoleModel.create({
      name,
      translation,
    });
    return await res.status(200).json({ role: newRole });
  } catch (error) {
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

exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    await RoleModel.findOneAndUpdate(
      { id: id },
      { deletedAt: new Date(now) }
    ).then((err, row) => {
      if (err) return res.status(500).json({ error: err });
      else {
        return res.status(200).json({ message: "Deleted successfuly" });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};


exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    await TeacherModel.findOneAndUpdate(
      { id: id },
      { deletedAt: new Date(now) }
    ).then((err, row) => {
      if (err) return res.status(500).json({ error: err });
      else {
        return res.status(200).json({ message: "Deleted successfuly" });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};


exports.deleteTeacherFromPage = async (req, res) => {
  try {
    const { id } = req.params;
    await PageModel.findOneAndUpdate(
      { id: id },
      { deletedAt: new Date(now) }
    ).then((err, row) => {
      if (err) return res.status(500).json({ error: err });
      else {
        return res.status(200).json({ message: "Deleted successfuly" });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
