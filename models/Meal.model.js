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
    lunchFood: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food" 
    }],
    dinnerFood: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food" 
    }],
    otherFood: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food" 
    }],
    calories: {
        type: Number,
        required: true
    }
  },
  {
    timestamps: true
  }
);

const Meal = model("Meal", mealSchema);

module.exports = Meal;
