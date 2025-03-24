// routes/progressRoutes.js
const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progressController");
const protect = require("../middleware/authMiddleware");

router.post("/start", progressController.startModule);
router.post("/update", progressController.updateProgress);
router.get("/:moduleId", progressController.getProgress);


module.exports = router;
