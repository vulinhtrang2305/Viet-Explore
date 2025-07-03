const express = require("express");
const router = express.Router();
const spotController = require("../../controllers/spots/spots.controller");

router.get("/spots", spotController.getAllSpot)
router.post("/spots/create", spotController.createSpot)
router.put("/spots/update/:id", spotController.updateSpot)

module.exports = router;
