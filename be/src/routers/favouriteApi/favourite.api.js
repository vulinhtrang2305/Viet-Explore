const express = require("express");
const router = express.Router();
const FavouriteController = require("../../controllers/favourites/favourites.controller");

router.get("/favourites", FavouriteController.getAllFavourite)

module.exports = router;
