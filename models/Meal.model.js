const { Schema, model, default: mongoose } = require('mongoose');

const mealSchema = new Schema(
  { 
    userName: {
        type: String,
        required: true 
    },   
    date: {
        type: Date,
        required: true
    },
    breakfastFood: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food"
    }],
    bfCalories: {
        type: Number,
        required: false
    },
    lunchFood: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food" 
    }],
    lunchCalories: {
        type: Number,
        required: false
    },
    dinnerFood: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food" 
    }],
    dinnerCalories: {
        type: Number,
        required: false
    },
    otherFood: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food" 
    }],
    otherCalories: {
        type: Number,
        required: false
    },
    calories: {
        type: Number,
        required: false
    }
  },
  {
    timestamps: true
  }
);

const Meal = model("Meal", mealSchema);

module.exports = Meal;
