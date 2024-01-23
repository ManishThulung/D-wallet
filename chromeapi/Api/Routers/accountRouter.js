const express = require("express");
const authController = require("../Controllers/authController");

const router = express.Router();

router.get("/all-account", authController.allAccount);
router.post("/create-account", authController.createAccount);

module.exports = router;
