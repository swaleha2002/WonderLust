const express=require("express");
const router=express.Router({mergeParams:true});
const ExpressError=require("../utils/ExpressError.js");
const wrapAsync=require("../utils/wrapAsync.js");
const Review=require("../models/review.js");
const Listing = require("../models/listing"); 
const {validateReview, isLoggedIn,isReviewAuthor}=require("../middleware.js")


// POST Reviews Route
router.post("/", validateReview,isLoggedIn, wrapAsync(async (req, res) => {
  console.log(req.params.id);
  const {id}=req.params;
   let listing = await Listing.findById(req.params.id);
   const { name, rating, comment } = req.body;
  // let newReview = new Review(req.body.review);
  
    // Push the new review to the listing
    const newReview = new Review({ name, rating, comment });
    listing.reviews.push(newReview);
    // Save the changes to the listing
    await newReview.save();
    await listing.save();
   req.flash("success","New Review Created!")
    res.redirect(`/listings/${listing._id}`);
  }));
  
  //POST Reviews delete Route
  router.delete("/:reviewId",isReviewAuthor,wrapAsync(async(req,res)=>{
  let {id,reviewId}=req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("success","Review Deleted")
  res.redirect(`/listings/${id}`);
  
  })
  );
  module.exports=router;