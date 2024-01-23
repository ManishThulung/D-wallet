const express = require("express");
const authController = require("../Controllers/authController");

const router = express.Router();

router.get("/all-token", authController.allToken);
router.post("/create-token", authController.createToken);

module.exports = router;
