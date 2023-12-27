const express = require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const User=require("../models/user.js");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");

router.get("/signup",(req,res)=>{
res.render("users/signup.ejs");
});
router.post("/signup", wrapAsync( async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
       const register=await User.register(newUser,password);
       console.log("registeredUser");
       req.login(registeredUser,(err)=>{
      if(err){
       return next();
      }
       req.flash("success","welcome to WanderLust");
       res.redirect("/listings");
  }); 
 }catch(e){
      req.flash("error",e.message);
      res.redirect("/signup");
    }
   
}));

router.get("/login",(req,res)=>{
 res.render("users/login.ejs");
});
router.post("/login",savedRedirectUrl, passport.authenticate({
    failureRedirect: "/login",
    failureFlash: true,
}), 
async (req, res) => {
    req.flash("success", "Welcome back to WanderLust! You are logged in");
    let redirectUrl=res.locals.redirectUrl||"/listings";
    res.redirect(redirectUrl);
});
router.get("/logOut",(req,res)=>{
    req.logout((err)=>{
        if(err){
  next(err);
        }
        req.flash("success", " You are loggedOut in");
        res.redirect("/listings");
    })
   });
   
   

module.exports=router;