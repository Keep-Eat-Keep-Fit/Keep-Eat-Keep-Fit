const User = require("../models/User.model");
const router = require("express").Router();

//display user-information UPDATE (add the rest of the infomation we have mentioned in User-model )
router.get("/user-profile/edit",(req, res) =>{
    
    const userId = req.session.currentUser._id;
   User.findById(userId)
      .then((userInfo) =>{       
       res.render("users/user-profile-edit", userInfo)
      })

});



//user-information UPDATE (add the rest of the infomation we have mentioned in User-model )
router.post("/user-profile/edit",(req, res) =>{
   const {age, gender, height, weight} = req.body;
   const userId = req.session.currentUser._id;
   updatedData = {   
    age,
    gender,
    height,
    weight
   }
   User.findByIdAndUpdate(userId, updatedData)
      .then(() =>{
        res.render("/users/ibm-result", updatedData)
      })
      .catch(err => {
        console.log("Error updating user-info...", err);
        next(err);
    });
});




module.exports = router;