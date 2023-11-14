require("../data/database");
const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
// const validator = require("express-joi-validation").createValidator({
//   passError: true,
// });
// const { userSchema, paramSchema } = require("../models/User");

// router.get("/:id", authController.getOne);
router.get("/getAllPagesForUser/:id", pageController.getAllPagesForUser);
router.get("/getAllPages", pageController.getAllPages);
router.get("/getPage/:id", pageController.getPage);
// router.put("/:id", validator.body(userSchema), errorJoi, authController.update);
router.post("/", pageController.createPage);
router.put("/", pageController.updatePage);
router.delete("/", pageController.deletePage);

module.exports = router;
