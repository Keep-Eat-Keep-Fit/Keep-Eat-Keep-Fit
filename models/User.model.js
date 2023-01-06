const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {    
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    birthdate:{
      type: String,
      required: false
    },
    gender:{
      type:String,
      required: false,
      enum:["male","female","diverse"]      
    },
    weight:{
      type:Number,
      required: false
    },
    height:{
      type:Number,
      required: false
    }
  },
  {
    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
