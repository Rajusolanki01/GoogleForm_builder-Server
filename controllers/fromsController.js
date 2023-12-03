  const { error, success } = require("../utils/responseWrap");
  const form = require("../models/Forms");
  const User = require("../models/User");

  const postFormController = async (req, res) => {
    try {
      const { title, description, text, questionType, options, correctedAnswer } =
        req.body;

      // Assuming "owner" is correctly set in the request or middleware
      const owner = req._id;

      // Validate the "question" field
      if (
        !title ||
        !description ||
        !text ||
        !questionType ||
        !options ||
        !correctedAnswer
      ) {
        return res.send(error(400, "All Fields are Required"));
      }

      // Check if the user exists
      const user = await User.findById(owner);

      if (!user) {
        return res.send(error(404, "User Not Found"));
      }

      const existingQuestion = await form.findOne({ text });

      if (existingQuestion) {
        return res.send(error(400, "Question is already exists"));
      }
      // Create a new FormQuestion
      const formDataBox = await form.create({
        owner,
        title,
        description,
        text,
        questionType,
        options,
        correctedAnswer,
      });

      // Update the user's form array with the new FormQuestion's ID
      user.formBox.push(formDataBox._id);
      await user.save();

      return res.send(success(200, formDataBox ));
    } catch (e) {
      res.send(error(500, e.message));
    }
  };

  module.exports = {
    postFormController,
  };
