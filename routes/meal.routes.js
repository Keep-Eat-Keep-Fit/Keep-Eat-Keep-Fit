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
                console.log("1. The data is ",newData, e.id)

                Meal.findByIdAndUpdate(e.id, newData)
                    .then((mealsFromDB) => {
                        console.log("update success")
                        console.log("3", mealsFromDB);
                    })
                    .catch(err => {
                        console.log("error getting meals from DB", err);
                        next(err)
                    })
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
            console.log("************");
            console.log("2.", mealsArr);

            console.log("************");
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
            res.redirect("/meals")
        })
        .catch(err => {
            console.log("error update meals from DB", err);
            next(err)
        })
    
    
})


//UPDATE: display form
router.get("/meals/:mealId/edit", (req, res, next) => {

    let mealArr;

    Meal.find()
        .then( (mealFromDB) => {
            mealArr = mealFromDB;
            return Meal.findById(req.params.mealId)
        })
        .then((mealDetails) => {
                //convert mongoose document to valid js object
                mealDetails = mealDetails.toObject();

                //format date
                const newDate = {
                    date: dayjs(mealDetails.date).format('YYYY/MM/DD')
                }

                mealDetails.date = newDate.date;


            const data = {
                mealDetails,
                mealArr
            };

            res.render("meals/meal-edit", data);
        })
        .catch(err => {
            console.log("Error getting meal details from DB...", err);
            next();
        });
});

//UPDATE: process form



//DELETE

module.exports = router;