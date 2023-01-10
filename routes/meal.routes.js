const User = require("../models/User.model");
const Meal = require("../models/Meal.model");
const Food = require("../models/Food.model");
const express = require('express');
const router = express.Router();
// const dayjs = require('dayjs')

//CREATE: display form
router.get("/meals/create", (req, res, next) => {
    const {username} = req.session.currentUser;
    Food.find({userName: username})
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
    let mealsArr;
    Meal.find({userName: username})
        .populate("breakfastFood")
        .populate("lunchFood")
        .populate("dinnerFood")
        .populate("otherFood")
        .then(mealsArr => {
            //can't change DB --> ask for help
            const newDate = {
                date: dayjs(mealsArr.date).format('YYYY/MM/DD')
            }
            //console.log(newDate);
            //console.log(mealsArr);
            
            // mealsArr.forEach((e) => {
            //     dayjs(e.date).format('DD/MM/YYYY');
            // })
            // console.log(mealsArr.date);
            // mealsArr.date = 
            // console.log(mealsArr.date);
            let sumCalOfBf = 0;
            let sumCalOfLunch = 0;
            let sumCalOfDinner = 0;
            let sumCalOfOther = 0;
            mealsArr.forEach((e) => {
                for(let i=0; i<e.breakfastFood.length;i++){
                    sumCalOfBf+=e.breakfastFood[i].totalCalories
                }
                return sumCalOfBf;
            })
            mealsArr.forEach((e) => {
                for(let i=0; i<e.lunchFood.length;i++){
                    sumCalOfLunch+=e.lunchFood[i].totalCalories
                }
                return sumCalOfLunch;
            })
            mealsArr.forEach((e) => {
                for(let i=0; i<e.dinnerFood.length;i++){
                    sumCalOfDinner+=e.dinnerFood[i].totalCalories
                }
                return sumCalOfDinner;
            })
            mealsArr.forEach((e) => {
                for(let i=0; i<e.otherFood.length;i++){
                    sumCalOfOther+=e.otherFood[i].totalCalories
                }
                return sumCalOfOther;
            })
            let totalCal = sumCalOfBf + sumCalOfLunch + sumCalOfDinner + sumCalOfOther;
                            
            const data = {
                sumCalOfBf,
                sumCalOfLunch,
                sumCalOfDinner,
                sumCalOfOther,
                totalCal,
                newDate,
                mealsArr 
            }
            //console.log(data);
           res.render("meals/meals-list", data)
        })
        
       
        .catch(err => {
            console.log("error getting meals from DB", err);
            next(err);
        })

    

})

//Calculate Food Calorie
router.post("/meals/calculateCalorie", (req, res, next) => {
    
    const {energy, quantity, id} = req.body;
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
    
    const {id} = req.body;
  
    Meal.findById(id)
        .then( dataFromDB => {

            return Food.findById( '63bd4714140d718916283a4f');
        })
        .then((dataFromFood) =>{
            // console.log(dataFromFood);
        })  
        .catch()
    res.redirect("/meals")
})

//READ: Meal details


//UPDATE: display form


//UPDATE: process form



//DELETE

module.exports = router;