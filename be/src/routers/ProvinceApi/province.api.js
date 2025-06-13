const express = require("express");
const router = express.Router();
const ProvinceController = require("../../controllers/provinces/provinces.controller");

router.get("/provinces", ProvinceController.getAllProvince)

module.exports = router;
