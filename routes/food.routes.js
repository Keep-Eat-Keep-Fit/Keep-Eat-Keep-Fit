const Food = require("../models/Food.model");
const express = require('express');
const router = express.Router();

//window is not defined??
const notice = () => {
    window.alert("This food has been added");
}

//CREATE: process
router.post("/food/create", (req, res, next) => {
   const {username} = req.session.currentUser;
    
    const foodDetails = {
        userName : username,
        name: req.body.name,
        energy: Math.round(req.body.energy) 
    }
    console.log(foodDetails);
    Food.create(foodDetails)
        .then(foodDetails => {
            console.log(foodDetails);
            res.redirect("/meals/create")
        })
        .catch(err => {
            console.log("error creating food from DB", err);
            //show notice that it has been added
            // notice();
            next();
        })
})

//READ: List all food
router.get("/food", (req, res, next) => {
    Food.find()
        .then(foodFromDB => {
            console.log(foodFromDB)

            // res.render("food/food-list", { meals: mealsFromDB })
        })
        .catch(err => {
            console.log("error getting food from DB", err);
            next(err);
        })
})

//UPDATE: display form


//UPDATE: process form



//DELETE


module.exports = router;