require("../data/database");
const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const { verifyToken } = require("../logic/jwtToken");

router.get("/getAllRoles", teacherController.getAllRoles);
router.post("/addRole", verifyToken, teacherController.createRole);

router.post("/:pageId", teacherController.create);
// router.put("/", verifyToken, pageController.updatePage);
// router.delete("/", verifyToken, teacherController.deleteTeacher);

module.exports = router;
