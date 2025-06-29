const express = require("express");
const router = express.Router();
const FavouriteController = require("../../controllers/favourites/favourites.controller");

router.get("/favourites", FavouriteController.getAllFavourite)
router.get("/favourites/:userId", FavouriteController.getFavouriteByUser);
router.post("/favourites/add", FavouriteController.addToFavouriteL)
router.delete("/favourites/:userId/:spotId", FavouriteController.deleteFavourite);

module.exports = router;
