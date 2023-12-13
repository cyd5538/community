const express = require("express");
const router = express.Router();
const {
  registerUser,
  LoginUser,
  GetLoginUser,
} = require("../controller/userController");
const { protect } = require("../middlewear/authmiddlewear");

router.post("/", registerUser);
router.post("/login", LoginUser);
router.post("/me", protect, GetLoginUser);

module.exports = router;