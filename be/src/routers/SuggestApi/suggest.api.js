const express = require("express");
const router = express.Router();
const suggestController = require("../../controllers/suggests/suggests.controller");

router.get("/suggests", suggestController.getAllSuggest)
router.post("/suggests/create", suggestController.createSuggest)
router.put("/suggests/update/:id", suggestController.updateSuggest)
router.delete("/suggests/delete/:id", suggestController.deleteSuggest)

module.exports = router;
