const express = require("express");
const authUser = require("../middlewares/auth-user");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router
  .post("/register", authController.register)
  .post("/login", authController.login)
  .post("/logout", authUser, authController.logout)
  .get("/me", authUser, authController.me)
  .post("/token", authUser, authController.token);

module.exports = router;
