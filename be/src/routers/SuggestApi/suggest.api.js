const express = require("express");
const router = express.Router();
const suggestController = require("../../controllers/suggests/suggests.controller");

router.get("/suggests", suggestController.getAllSuggest)
router.post("/suggests/create", suggestController.createSuggest)

module.exports = router;
