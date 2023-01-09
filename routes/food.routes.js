const Food = require("../models/Food.model");
const express = require('express');
const router = express.Router();


//CREATE: process
router.post("/meals/create", (req, res, next) => {
    const { 
        userName, date, breakfastFood, lunchFood, dinnerFood, otherFood, calories
    } = req.body;

    let mealDetails = { userName, date, breakfastFood, lunchFood, dinnerFood, otherFood, calories}

    Meal.create(mealDetails)
        .then(mealDetails => {
            console.log(mealDetails);
            // res.redirect("/meals")
        })
        .catch(err => {
            console.log("error creating meals from DB", err);
            next(err);
        })
})

//READ: List all food
router.get("/meals", (req, res, next) => {
    Meal.find()
        .populate("userName")
        .then(mealsFromDB => {
            console.log(mealsFromDB)

            // res.render("meals/meals-list", { meals: mealsFromDB })
        })
        .catch(err => {
            console.log("error getting meals from DB", err);
            next(err);
        })
})

//UPDATE: display form


//UPDATE: process form



//DELETE
