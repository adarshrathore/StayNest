const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
}

module.exports.signup = async (req, res) => {
  try {
    let {username, email, password} = req.body;
    const newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);

    //auto login
    req.login(registeredUser, (err) => {
      if(err) {
        return next(err);
      }
      req.flash("success", "Welcome to StayNest");
      res.redirect("/listings");
    });
  } catch(e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.performLogin= async (req, res) => {
  req.flash("success", "Welcome! You are logged in.");

  if(res.locals.redirectUrl) {
    res.redirect(res.locals.redirectUrl);
  }
  else{
    res.redirect("/listings");
  }
};


module.exports.performLogout = (req, res) => {
  req.logout((err) => {
    if(err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  })
};