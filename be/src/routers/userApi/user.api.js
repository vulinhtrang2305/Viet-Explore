const express = require("express");
const router = express.Router();
const userController = require("../../controllers/users/users.controller");

router.get("/users", userController.getAllUser)

module.exports = router;
