const express = require("express");
const productController = require("../controllers/product.controller");
const orderController = require("../controllers/order.controller");
const router = express.Router();

router.get("/products", productController.getAll);

module.exports = router;