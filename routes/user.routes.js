const User = require("../models/User.model");
const router = require("express").Router();
const dbHasInfoOfUser = require("../middleware/dbHasInfoOfUser");
const isLoggedIn = require("../middleware/isLoggeIn");

//display user-profile-details
router.get("/user-profile/details",isLoggedIn, (req, res) =>{
  const userId = req.session.currentUser._id;  
   User.findById(userId)
      .then((userInfo) =>{ 
     res.render("users/user-profile-details", userInfo)
      })    
});


//display user-information UPDATE (add the rest of the infomation we have mentioned in User-model )
router.get("/user-profile/edit", isLoggedIn, (req, res) =>{   
  const userId = req.session.currentUser._id;  
   User.findById(userId)
      .then((userInfo) =>{  
       res.render("users/user-profile-edit", userInfo)
      })  
});



//user-information UPDATE (add the rest of the infomation we have mentioned in User-model )
router.post("/user-profile/edit",isLoggedIn, (req, res, next) =>{
   const {age, gender, height, weight} = req.body;    
   const userId = req.session.currentUser._id;   
   updatedData = {   
    age,
    gender,
    height,
    weight
   }
   User.findByIdAndUpdate(userId, updatedData,{new:true})
      .then(() =>{       
        res.redirect("/user-profile")
      })
      .catch(err => {
        console.log("Error updating user-info...", err);
        next(err);
    });
});

//display BMI-Calculator
router.get("/user-profile/bmi-calculator", isLoggedIn, (req, res, next) =>{
  const userInfo = req.session.currentUser ;  
  res.render("users/user-bmi-calculator", userInfo)
});

router.post("/user-profile/bmi-calculator", isLoggedIn, dbHasInfoOfUser, (req, res, next) =>{
  const userInfo = req.session.currentUser ;
  const {age, gender, weight, height} = userInfo;
  const bmiResult = weight/(height/100)**2; 
  const bmiResult2 = bmiResult.toFixed(2);
  const healthyWeight1 = (18.5 * (height/100)**2).toFixed(2);
  const healthyWeight2 = (25 * (height/100)**2).toFixed(2);
  const data = {
    age,
    gender,
    weight,
    height,
    bmiResult2,
    healthyWeight1,
    healthyWeight2
  } 
  res.render("users/user-bmi-calculator", data)
});


module.exports = router;