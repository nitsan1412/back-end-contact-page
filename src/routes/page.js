require("../data/database");
const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const { verifyToken } = require("../logic/jwtToken");
// const validator = require("express-joi-validation").createValidator({
//   passError: true,
// });
// const { userSchema, paramSchema } = require("../models/User");

// router.get("/:id", authController.getOne);
router.get(
  "/getAllPagesForUser/:userId",
  verifyToken,
  pageController.getAllPagesForUser
);
router.get("/getAllPages", verifyToken, pageController.getAllPages);
router.get("/getPage/:id", verifyToken, pageController.getPage);
// router.put("/:id", validator.body(userSchema), errorJoi, authController.update);
router.post("/", verifyToken, pageController.create);
router.put("/", verifyToken, pageController.updatePage);
router.delete("/", verifyToken, pageController.deletePage);

module.exports = router;
