const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
// const multer  = require('multer');

// const {storage} = require("../cloudConfig.js");
// const upload = multer({ dest: 'uploads/' });
const listingController = require("../controllers/listings.js");

//index and create routes
router.route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing));
  // .post(upload.single('listing[image]'), (req, res) => {
  //   res.send(req.file);
  // });

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//show, update and delete routes
router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(isLoggedIn, isOwner, wrapAsync(listingController.updateListing))
  .delete( isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;