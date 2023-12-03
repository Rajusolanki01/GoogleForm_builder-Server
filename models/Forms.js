const mongoose = require("mongoose");

const formsSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    PublicId: String,
    url: String,
  },
  questionType: {
    type: String,
    enum: ["multipleChoice", "dragAndDrop", "cloze", "comprehension"],
  },
  options: [{ type: String }],
  correctedAnswer: {
    type: String,
    required: true,
  },
  created_At: { type: Date, default: Date.now() },
  updated_At: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("form", formsSchema);
