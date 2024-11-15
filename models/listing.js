const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

let default_img_link = "https://plus.unsplash.com/premium_photo-1682310096066-20c267e20605?q=80&w=1824&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,

    //if the image is undefined 
    default:
      default_img_link,
    
    //else set checking if empty string
    set: (v) => v===""? default_img_link : v,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
      ref: "User",
  }
});

//mongoose middleware
listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}});
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;