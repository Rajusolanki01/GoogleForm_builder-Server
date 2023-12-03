const router = require("express").Router();
const homeController = require("../controllers/homeUI");
const requireUser = require("../middleware/require")

router.get("/data", requireUser, homeController.getHomeUIController);

module.exports = router;