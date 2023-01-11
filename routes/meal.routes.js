const User = require("../models/User.model");
const Meal = require("../models/Meal.model");
const Food = require("../models/Food.model");
const express = require('express');
const router = express.Router();
const dayjs = require('dayjs')

//CREATE: display form
router.get("/meals/create", (req, res, next) => {
    const { username } = req.session.currentUser;
    Food.find({ userName: username })
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

    let mealDetails = { userName, date, breakfastFood, lunchFood, dinnerFood, otherFood, calories }

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
    const { username } = req.session.currentUser;

    // const {energy, quantity} = req.query
    Meal.find({ userName: username })
        .populate("breakfastFood")
        .populate("lunchFood")
        .populate("dinnerFood")
        .populate("otherFood")
        .then(mealsArr => {

            mealsArr.forEach((e) => {
                let sumCalOfBf = 0;
                let sumCalOfLunch = 0;
                let sumCalOfDinner = 0;
                let sumCalOfOther = 0;
                
                e.breakfastFood.forEach((e) => {
                    sumCalOfBf += e.totalCalories;
                })

                e.lunchFood.forEach((e) => {
                    sumCalOfLunch += e.totalCalories;
                })

                e.dinnerFood.forEach((e) => {
                    sumCalOfDinner += e.totalCalories;
                })
                
                e.otherFood.forEach((e) => {
                    sumCalOfOther += e.totalCalories;
                })

                let totalCal = sumCalOfBf + sumCalOfLunch + sumCalOfDinner + sumCalOfOther;

                const newData = {
                    bfCalories: Math.round(sumCalOfBf),
                    lunchCalories: Math.round(sumCalOfLunch),
                    dinnerCalories: Math.round(sumCalOfDinner),
                    otherCalories: Math.round(sumCalOfOther),
                    calories: Math.round(totalCal),
                }
                console.log(newData)
                Meal.findByIdAndUpdate(e.id, newData)
                    .then(()=>console.log("update success"))
            })


            const mealsArrWithFormattedDate = mealsArr.map( (meal) => {

                //convert mongoose document to valid js object
                meal = meal.toObject();

                //format date
                const newDate = {
                    date: dayjs(meal.date).format('YYYY/MM/DD')
                }

                meal.date = newDate.date;

                return meal;
            });

            const data = {
                mealsArrWithFormattedDate
            }

            

            res.render("meals/meals-list", data)
        })
        .catch(err => {
            console.log("error getting meals from DB", err);
            next(err);
        })
})

//Calculate Food Calorie
router.post("/meals/calculateCalorie", (req, res, next) => {

    const { energy, quantity, id } = req.body;
    const calories = energy * quantity;
    const newData = {
        quantity: quantity,
        energy: energy,
        totalCalories: calories
    }

    Food.findByIdAndUpdate(id, newData)
        .then(() => {
            console.log('update success')
            Meal.findByIdAndUpdate()
            res.redirect(`/meals`)
        })
        .catch(err => {
            console.log("error update meals from DB", err);
            next(err)
        })
    res.render("meals/meals-list", newData);
    res.redirect("/meals")
})

//Calculate meal calorie
router.post("/meals/calculateMealCalorie", (req, res, next) => {

    const { id } = req.body;

    Meal.findById(id)
        .then(dataFromDB => {

            return Food.findById('63bd4714140d718916283a4f');
        })
        .then((dataFromFood) => {
            // console.log(dataFromFood);
        })
        .catch()
    res.redirect("/meals")
})


//UPDATE: display form


//UPDATE: process form



//DELETE

module.exports = router;