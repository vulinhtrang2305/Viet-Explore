const express = require("express");
const router = express.Router();
const ReviewController = require("../../controllers/reviews/review.controller");

router.get("/reviews", ReviewController.getAllReview)

module.exports = router;
