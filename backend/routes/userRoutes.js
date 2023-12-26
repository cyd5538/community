const express = require("express");
const router = express.Router();
const {
  registerUser,
  LoginUser,
  GetLoginUser,
  checkNickname,
  updateUser
} = require("../controller/userController");
const { protect } = require("../middlewear/authmiddlewear");

router.post("/", registerUser);
router.post("/login", LoginUser);
router.post("/me", protect, GetLoginUser);
router.patch("/update", protect, updateUser);
router.get('/:nickname', checkNickname);
module.exports = router;