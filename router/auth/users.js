const express = require("express");
const router = express.Router();
const {
  register,
  login,
  verifyEmail,
} = require("../../controllers/auth/users");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/verify/:userID/:emailToken").get(verifyEmail);

module.exports = router;
