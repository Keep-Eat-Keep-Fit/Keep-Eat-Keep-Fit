const User = require("../models/User.model")
const Meal = require("../models/Meal.model")
const express = require('express');
const router = express.Router();
const axios = require('axios');
const baseURL = 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser'

//CREATE: display form
router.get("/meals/create", (req, res, next) => {
    Meal.find()
        .then((mealArr) => {
            res.render("meals/meal-create", {mealArr})
        })
        .catch(err => {
            console.log("error getting meals from DB", err);
            next(err);
        })
})

//CREATE: process form
router.post("/meals/create", (req, res, next) => {
    const { userName, date, haveBreakfast, nameOfBreakfast, breakfastFood, nameOfLunch, lunchFood, nameOfDinner, dinnerFood, nameOfOthers, otherFood, calories
    } = req.body;

    Meal.find()
        .then((mealArr) => {
            res.render("meals/meal-create", {mealArr})
        })
        .catch(err => {
            console.log("error getting meals from DB", err);
            next(err);
        })
})

//READ: List all meals


//READ: Meal details


//UPDATE: display form


//UPDATE: process form



//DELETE

module.exports = router;