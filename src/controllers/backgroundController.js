const dataAccess = require("../logic/data-access");
const BackgroundModel = require("../models/Background");

exports.getAllBackgrounds = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Check if a user with the given email or phone number already exists
    const existingBackgrounds = await BackgroundModel.find({ deletedAt: null });
    if (!existingBackgrounds) {
      return res.status(400).json({
        error: "no backgrounds found",
      });
    }
    return res
      .status(200)
      .send({ backgrounds: existingBackgrounds, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBackground = async (req, res) => {
  try {
    const existingBackground = await BackgroundModel.findOne();
    if (!existingBackground) {
      return res.status(400).json({
        error: "Background dosen't exists",
      });
    }
    return res.status(200).send({ page: existingBackground, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  const { name, link } = req.body;
  try {
    const newBackground = await BackgroundModel.create({
      name,
      link,
    });
    console.log(newBackground);
    if (newBackground["_id"]) {
      return await res.status(200).json({ background: newBackground });
    }
  } catch (error) {
    await res.status(502).json({ error: error.message });
  }
};

exports.deleteBackground = async (req, res) => {
  try {
    const { id } = req.params;
    await dataAccess
      .findOneAndUpdate({ id: id }, { deletedAt: new Date(now) })
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
