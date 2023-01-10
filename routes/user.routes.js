const User = require("../models/User.model");
const router = require("express").Router();

//in case the live of session come to end,we need to let the user login again
const isLoggedIn = (req, res, next) => {
  if(req.session.currentUser){
      next(); 
  } else {
      res.redirect("/login")
  }
}

//when the database already has the full information of the user
const dbHasInfoOfUser = (req, res, next) => { 
      if (req.session.currentUser.age && req.session.currentUser.gender && req.session.currentUser.weight && req.session.currentUser.height) {
        next();
      } else {
        res.redirect("/user-profile/edit")
      }; 
}

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
  //console.log(userId); 
   User.findById(userId)
      .then((userInfo) =>{  
       res.render("users/user-profile-edit", userInfo)
      })  
});



//user-information UPDATE (add the rest of the infomation we have mentioned in User-model )
router.post("/user-profile/edit",isLoggedIn, (req, res, next) =>{
   const {photo, age, gender, height, weight} = req.body;   
   const userId = req.session.currentUser._id;   
   updatedData = {
    photo,   
    age,
    gender,
    height,
    weight
   }
   User.findByIdAndUpdate(userId, updatedData)
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
  //console.log(userInfo);
  res.render("users/user-bmi-calculator", userInfo)
});

router.post("/user-profile/bmi-calculator", isLoggedIn, dbHasInfoOfUser, (req, res, next) =>{
  const userInfo = req.session.currentUser ;
  const {age, gender, weight, height} = userInfo;
  const bmiResult = weight/(height/100)**2; 
  const bmiResult2 = bmiResult.toFixed(2);
  const data = {
    age,
    gender,
    weight,
    height,
    bmiResult2
  }
  // console.log(data);
  res.render("users/user-bmi-calculator", data)
});


module.exports = router;