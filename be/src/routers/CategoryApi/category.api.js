const express = require("express");
const router = express.Router();
const CategoryController = require("../../controllers/categories/categories.controller");

router.get("/categories", CategoryController.getAllCategory)

module.exports = router;
