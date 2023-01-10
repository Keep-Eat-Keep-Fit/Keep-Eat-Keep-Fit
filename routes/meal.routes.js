const User = require("../models/User.model");
const Meal = require("../models/Meal.model");
const Food = require("../models/Food.model");
const express = require('express');
const router = express.Router();
const dayjs = require('dayjs')

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
    let { 
        userName, date, breakfastFood, lunchFood, dinnerFood, otherFood, calories
    } = req.body;

    let mealDetails = { userName, date, breakfastFood, lunchFood, dinnerFood, otherFood, calories}

    Meal.create(mealDetails)
        .then(mealDetails => {   
            console.log("create success");
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

    // const {energy, quantity} = req.query

    Meal.find({userName: username})
        .populate("breakfastFood")
        .populate("lunchFood")
        .populate("dinnerFood")
        .populate("otherFood")
        .then(mealsArr => {
            //can't change DB --> ask for help
            // const newDate = {
            //     date: dayjs(mealsArr.date).format('DD/MM/YYYY')
            // }


            
            // Meal.findByIdAndUpdate(id, newDate)
// const meals = {
//     mealsArr,
//     energyResult2,
//     eachFoodEn
// }

            res.render("meals/meals-list", {meals: mealsArr})
        })
        .catch(err => {
            console.log("error getting meals from DB", err);
            next(err);
        })

    

})

//Calculate Calorie
router.post("/meals/calculateCalorie", (req, res, next) => {
    
    const {energy, quantity, id} = req.body;
    const calories = energy * quantity;
    const newData = {
        quantity: quantity,
        
    }

    Food.findByIdAndUpdate(id)
        .then(
            
        )
        .catch()
    res.render("meals/meals-list", {calories});
    res.redirect("/meals")
})

//READ: Meal details


//UPDATE: display form


//UPDATE: process form



//DELETE

module.exports = router;