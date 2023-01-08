const { Schema, model, default: mongoose } = require('mongoose');

const mealSchema = new Schema(
  { 
    userName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" //.username?
    },   
    date: {
        type: Date,
        required: true
    },
    haveBreakfast: {
        type: Boolean,
        required: true
    },
    breakfastFood: {
        type: String,
        required: false,
        lowercase: true,
        trim: true
    },
    haveLunch: {
        type: Boolean,
        required: true
    },
    lunchFood: {
        type: String,
        required: false,
        lowercase: true,
        trim: true
    },
    haveDinner: {
        type: Boolean,
        required: true
    },
    dinnerFood: {
        type: String,
        required: false,
        lowercase: true,
        trim: true
    },
    haveOthers: {
        type: Boolean,
        required: true
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
