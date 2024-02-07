require("../data/database");
const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const { verifyToken } = require("../logic/jwtToken");

router.get("/getAllRoles", teacherController.getAllRoles);
router.post("/addRole", verifyToken, teacherController.createRole);
router.delete("/:id", verifyToken, teacherController.deleteRole);

router.post("/:pageId", teacherController.create);
// router.put("/", verifyToken, pageController.updatePage);

module.exports = router;
