require("../data/database");
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../logic/jwtToken");
const authController = require("../controllers/authController");

router.post("/", authController.createUser);
router.post("/login", authController.login);
router.delete("/", authController.deleteUser);
router.get("/getUserInfo", verifyToken, authController.getUserInfo);

module.exports = router;
