const Listing = require("./models/listing");
const Review=require("./models/review.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema}=require("./schema.js");
const {reviewSchema}=require("./schema.js");
 module.exports.isLoggedIn=(req,res,next)=>{
  
    if(!req.isAuthenticated()){
      //redirect url
      req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged in to create listings")
        return res.redirect("/login");
       }
         next();
};
module.exports.savedRedirectUrl=(req,res,next)=>{
 if( req.session.redirectUrl){
  res.locals.redirectUrl= req.session.redirectUrl;
 }
 next();
};
module.exports.isOwner= async(req,res,next)=>{
  let { id } = req.params;
  let listing= await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currUser._id)){
    req.flash("error","you don't have permission to Edit");
   return res.redirect(`/listings/${id}`);
  }
  next();
};
module.exports.validateListing=(req,res,next)=>{
  let {err}= listingSchema.validate(req.body);
  // console.log(result);
  if(err){
    let errMsg=err.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }else{
    next();
  }

};
module.exports.validateReview=(req,res,next)=>{
  let {err}= reviewSchema.validate(req.body);
  //console.log(result);
  if(err){
    let errMsg=err.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }else{
    next();
  }

};
module.exports.isReviewAuthor= async(req,res,next)=>{
  let { id,reviewId } = req.params;
  let review= await review.findById(reviewId);
  if(!review.author.owner.equals(res.locals.currUser._id)){
    req.flash("error","you are not the Author");
   return res.redirect(`/listings/${id}`);
  }
  next();
};