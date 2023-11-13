require("../data/database");
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
// const validator = require("express-joi-validation").createValidator({
//   passError: true,
// });
// const { userSchema, paramSchema } = require("../models/User");

// router.get("/", authController.getAll);
// router.get("/:id", authController.getOne);
router.post("/", authController.create);
// router.put("/:id", validator.body(userSchema), errorJoi, authController.update);
router.post("/login", authController.login);
// router.delete("/", authController.delete);

module.exports = router;
