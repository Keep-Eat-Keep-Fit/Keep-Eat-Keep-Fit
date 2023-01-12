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
        userName, date, breakfastFood, lunchFood, dinnerFood, otherFood
    } = req.body;

    let mealDetails = { userName, date, breakfastFood, lunchFood, dinnerFood, otherFood, calories:0 }


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


//UPDATE Food: display form
router.get("/meals/:mealId/editfood", (req, res, next) => {

    let foodArr;

    Food.find()
        .then( (foodFromDB) => {
            foodArr = foodFromDB;
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
                foodArr
            };

            res.render("meals/meal-edit-food", data);
        })
        .catch(err => {
            console.log("Error getting meal details from DB...", err);
            next();
        });
});

//UPDATE Food: process form
router.post("/meals/:mealId/editfood",  (req, res, next) => {
    const mealId = req.params.mealId;

    let {
        date, bfFood, lunchFood, dinnerFood, otherFood
    } = req.body;

    let newDetails = {date, bfFood, lunchFood, dinnerFood, otherFood}

    Meal.findByIdAndUpdate(mealId, newDetails)
        .then(() => {
            res.redirect(`/meals`);
        })
        .catch(err => {
            console.log("Error updating meal...", err);
            next();
        });
});

//UPDATE quantity: display form
router.get("/meals/:mealId/editquantity", (req, res, next) => { 
    let mealId = req.params.mealId
    Meal.findById(req.params.mealId)
        .populate("breakfastFood lunchFood dinnerFood otherFood")
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
                    mealId
                };
            res.render("meals/meal-edit-quantity", data);
        })
        .catch(err => {
            console.log("Error getting meal details from DB...", err);
            next();
        });
});

//UPDATE quantity: process form
router.post("/meals/:mealId/editquantity",  (req, res, next) => {
    const mealId = req.params.mealId;
    console.log('entered in the route')
    
    const { energy, quantity, id } = req.body;
    const calories = energy * quantity;
    const newData = {
        quantity: quantity,
        energy: energy,
        totalCalories: calories
    }

    Food.findByIdAndUpdate(id, newData, {new: true})
    .then((food) => {
        console.log(food)
        return food
    })
    .then(()=>{
        Meal.findById(mealId)
        .populate("breakfastFood lunchFood dinnerFood otherFood")
        .then((mealsArr)=>{
            
                let sumCalOfBf = 0;
                let sumCalOfLunch = 0;
                let sumCalOfDinner = 0;
                let sumCalOfOther = 0;
                
                mealsArr.breakfastFood.forEach((e) => {
                    sumCalOfBf += e.totalCalories;
                })
            
                mealsArr.lunchFood.forEach((e) => {
                    sumCalOfLunch += e.totalCalories;
                })
            
                mealsArr.dinnerFood.forEach((e) => {
                    sumCalOfDinner += e.totalCalories;
                })
                
                mealsArr.otherFood.forEach((e) => {
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
                console.log("The data is ",newData)
                return Meal.findByIdAndUpdate(mealId, newData)
                
        })
        .then(()=>{
            res.redirect(`/meals/${mealId}/editquantity`)
        })
        .catch(error => {
            console.log('Error updating the food from the meal', error)
            next(error)
        })
    })
})
   
//DELETE
router.post("/meals/:mealId/delete", (req, res, next) => {
    Meal.findByIdAndDelete(req.params.mealId)
        .then(() => {
            res.redirect("/meals");
        })
        .catch(err => {
            console.log("Error deleting meal...", err);
            next();
        });

});

module.exports = router;