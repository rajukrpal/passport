var express = require('express');
const passport = require('passport');
const userModel = require("./users")
var router = express.Router();
const localStrategy = require("passport-local")
passport.use(new localStrategy(userModel.authenticate()))


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/register",(req,res)=>{
  res.render("index")
})

router.get("/profile",isLoggedIn,(req,res)=>{
  res.render("profile");
})

router.post("/register",async(req,res)=>{
  var userdata = await userModel({
    username: req.body.username,
    email:req.body.email,
    discription:req.body.discription
  })
  await userModel.register(userdata,req.body.password)
  .then((registereduser)=>{
    passport.authenticate('local')(req,res,()=>{
      res.redirect("/profile")
    })
  })
  // res.redirect("/profile")
})

router.post('/login',passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/register',
  // failureFlash: true
}));

router.get("/logout",(req,res,next)=>{
  req.logout((err)=>{
    if(err){return next(err)}
  })
  res.redirect("/register")
})

// isLoggedin middleware
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/register")
} 
module.exports = router;

