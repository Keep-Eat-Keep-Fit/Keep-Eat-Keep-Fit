const { Schema, model } = require("mongoose");

const foodSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        energy: {
            type: Number,
            required: true
        }
    },
    {
      timestamps: true
    }
);

const Food = model("Food", foodSchema);

module.exports = Food;