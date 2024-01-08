require("../data/database");
const express = require("express");
const router = express.Router();
const kidController = require("../controllers/kidController");
const { verifyToken } = require("../logic/jwtToken");
// const validator = require("express-joi-validation").createValidator({
//   passError: true,
// });
// const { userSchema, paramSchema } = require("../models/User");

// router.get("/:id", authController.getOne);
// router.get(
//   "/getAllPagesForUser/:userId",
//   verifyToken,
//   kidController.getAllPagesForUser
// );
// router.get("/getAllKids", verifyToken, kidController.getAllPages);
// router.get("/getPage/:id", verifyToken, kidController.getPage);
// router.put("/:id", validator.body(userSchema), errorJoi, authController.update);
// router.post("/:pageId", kidController.create);
// router.put("/", verifyToken, pageController.updatePage);
// router.delete("/", verifyToken, kidController.deleteKid);

module.exports = router;
