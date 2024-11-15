const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", {allListings});
  };

module.exports.renderNewForm = (req, res) => {
  res.render("listings/newlisting.ejs");
}; 

module.exports.showListing = async (req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id)
  .populate({path: "reviews", 
    populate: {path: "author"},
  }).populate("owner");
  if(!listing)
  {
    req.flash("error", "Requested Listing Does Not Exist!");
    res.redirect("/listings");
  }
  // console.log(listing);
  res.render("listings/show.ejs", {listing});
};

module.exports.createListing = async (req, res, next) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  // console.log(newListing);
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
}

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing)
  {
    req.flash("error", "Requested Listing Does Not Exist!");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", {listing});
}

module.exports.updateListing = async (req, res) => {
  if(!req.body.listing) {
    throw new ExpressError(400, "Send valid data to update listing!")
  }
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect(`/listings`);
}