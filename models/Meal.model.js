const { Schema, model, default: mongoose } = require('mongoose');

const mealSchema = new Schema(
  { 
    userName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" 
    },   
    date: {
        type: Date,
        required: true
    },
    breakfastFood: {
        type: String,
        required: false,
        lowercase: true,
        trim: true
    },
    lunchFood: {
        type: String,
        required: false,
        lowercase: true,
        trim: true
    },
    dinnerFood: {
        type: String,
        required: false,
        lowercase: true,
        trim: true
    },
    otherFood: {
        type: String,
        required: false,
        lowercase: true,
        trim: true
    },
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
