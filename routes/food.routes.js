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
   
   const total = quantity * req.body.energy;

    const foodDetails = {
        userName : username,
        name: req.body.name,
        quantity: 1,
        energy: Math.round(req.body.energy),
        image: req.body.image,
        totalCalories: Math.round(total)
    }
    //console.log(foodDetails);
    Food.create(foodDetails)
        .then(foodDetails => {
            res.redirect("/meals/create")
        })
        .catch(err => {
            console.log("error creating food from DB", err);
            next();
        })
})

//READ: List all food
router.get("/food", (req, res, next) => {
    Food.find()
        .then(foodFromDB => {
            res.render("food/food-list", {foodFromDB})
        })
        .catch(err => {
            console.log("error getting food from DB", err);
            next(err);
        })
})

//UPDATE: display form
router.get("/food/:foodId/edit", (req, res, next) => {

    let foodArr;

    Food.find()
        .then( (foodFromDB) => {
            foodArr = foodFromDB;
            return Food.findById(req.params.foodId)
        })
        .then((foodDetails) => {

            const data = {
                foodDetails,
                foodArr
            };

            res.render("food/food-edit", data);
        })
        .catch(err => {
            console.log("Error getting food details from DB...", err);
            next();
        });
});

//UPDATE: process form
router.post("/food/:foodId/edit",  (req, res, next) => {
    const foodId = req.params.foodId;

    const newDetails = {
        name: req.body.name,
        energy: req.body.energy,
        image: req.body.image,
    }

    Food.findByIdAndUpdate(foodId, newDetails)
        .then(() => {
            res.redirect(`/food`);
        })
        .catch(err => {
            console.log("Error updating food...", err);
            next();
        });
});


//DELETE
router.post("/food/:foodId/delete", (req, res, next) => {
    Food.findByIdAndDelete(req.params.foodId)
        .then(() => {
            res.redirect("/food");
        })
        .catch(err => {
            console.log("Error deleting food...", err);
            next();
        });

});


module.exports = router;