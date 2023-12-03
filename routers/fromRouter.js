const router = require("express").Router();
const formController = require("../controllers/fromsController")
const requireUser = require("../middleware/require")

router.post("/create-form", requireUser, formController.postFormController);

module.exports = router;