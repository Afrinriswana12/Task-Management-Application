const express = require("express");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

console.log("Auth route hit");

module.exports = router;