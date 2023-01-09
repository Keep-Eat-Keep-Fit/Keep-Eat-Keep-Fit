const User = require("../models/User.model");
const Meal = require("../models/Meal.model");
const Food = require("../models/Food.model");
const express = require('express');
const router = express.Router();

//CREATE: display form
router.get("/meals/create", (req, res, next) => {
    const {username} = req.session.currentUser;
    Food.find()
        .then((foodArr) => {
            const data = {
                username,
                foodArr
            }
            res.render("meals/meal-create", data)
    })
    .catch(err => {
        console.log("error getting food from DB", err);
        next(err);
    })


    
})

//CREATE: process form
router.post("/meals/create", (req, res, next) => {
    const { 
        userName, date, breakfastFood, lunchFood, dinnerFood, otherFood, calories
    } = req.body;

    let mealDetails = { userName, date, breakfastFood, lunchFood, dinnerFood, otherFood, calories}

    Meal.create(mealDetails)
        .then(mealDetails => {   
            res.redirect("/meals")
        })
        .catch(err => {
            console.log("error creating meals from DB", err);
            next(err);
        })
})

//READ: List all meals
router.get("/meals", (req, res, next) => {
    const {username} = req.session.currentUser;

    Meal.find({userName: username})
        .populate("breakfastFood")
        .populate("lunchFood")
        .populate("dinnerFood")
        .populate("otherFood")
        .then(mealsFromDB => {
            console.log(mealsFromDB)

            res.render("meals/meals-list", { meals: mealsFromDB })
        })
        .catch(err => {
            console.log("error getting meals from DB", err);
            next(err);
        })

    

})

//READ: Meal details


//UPDATE: display form


//UPDATE: process form



//DELETE

module.exports = router;