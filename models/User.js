const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "First Name & last Name is Required!"],
  },
  email: {
    type: String,
    required: [true, " Email is Required!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required!"],
    minlength: [6, "Password length should be greater than 6 character"],
    select: true,
  },
  avatar: {
    publicId: String,
    url: String,
  },
  formBox: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "form",
    },
  ],
  created_At: { type: Date, default: Date.now() },
  updated_At: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("user", userSchema);
