const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router.get("/signup", userController.renderSignupForm);

router.post("/signup", wrapAsync(userController.signup));

router.get("/login", userController.renderLoginForm);

router.post("/login", saveRedirectUrl,
  passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}),
  wrapAsync(userController.performLogin));

router.get("/logout", userController.performLogout );

module.exports = router;