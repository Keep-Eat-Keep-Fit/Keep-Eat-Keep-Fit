const { Schema, model } = require("mongoose");

const foodSchema = new Schema(
    {
        foodName: String,
        energy: Number
    },
    {
      timestamps: true
    }
);

const Food = model("Food", foodSchema);

module.exports = Food;