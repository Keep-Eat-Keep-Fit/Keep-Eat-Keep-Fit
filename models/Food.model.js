const { Schema, model } = require("mongoose");

const foodSchema = new Schema(
    {
        userName: {
            type: String,
            required: true 
        },
        name: {
            type: String,
            required: true,
        },
        energy: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: false
        },
        totalCalories: {
            type: Number,
            required: false
        },
        image: {
            type: String,
            require: false
        }
    },
    {
      timestamps: true
    }
);

const Food = model("Food", foodSchema);

module.exports = Food;