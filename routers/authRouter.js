const router = require("express").Router();
const authController = require("../controllers/authControllers.js");

router.post("/signup", authController.signupController);
router.post("/login", authController.loginController);
router.get("/refresh", authController.refreshAccessTokenController);

module.exports = router;