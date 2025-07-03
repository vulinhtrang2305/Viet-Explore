const express = require("express");
const router = express.Router();
const ProvinceController = require("../../controllers/provinces/provinces.controller");

router.get("/provinces", ProvinceController.getAllProvince)
router.post("/provinces/create", ProvinceController.createProvince)
router.put("/provinces/update/:id", ProvinceController.updateProvince)

module.exports = router;
