const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  { 
    username:{
      type: String,
      required: [true, 'Username is required.'],
      unique: true,     
      trim: true
    },   
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
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
