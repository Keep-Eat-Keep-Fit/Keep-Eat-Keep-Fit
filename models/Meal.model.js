const { Schema, model, default: mongoose } = require('mongoose');

const mealSchema = new Schema(
  { 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },   
    date: {
        type: Date,
        required: true,
        unique: true,
        lowercase: true
    },
    haveBreakfast: {
        type: Boolean,
        required: true
    },
    nameOfBreakfast: {
        type: String,
        required: false,
        lowercase: true,
        trim: true
    },
    breakfastFood: Array,
    haveLunch: {
        type: Boolean,
        required: true
    },
    nameOfLunch: {
        type: String,
        required: false,
        lowercase: true,
        trim: true
    },
    lunchFood: Array,
    haveDinner: {
        type: Boolean,
        required: true
    },
    nameOfDinner: {
        type: String,
        required: false,
        lowercase: true,
        trim: true
    },
    dinnerFood: Array,
    haveOthers: {
        type: Boolean,
        required: true
    },
    nameOfOthers: {
        type: String,
        required: false,
        lowercase: true,
        trim: true
    },
    otherFood: Array,
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
