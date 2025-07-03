const express = require("express");
const router = express.Router();
const ReviewController = require("../../controllers/reviews/review.controller");

router.get("/reviews", ReviewController.getAllReview)
router.post("/reviews/create", ReviewController.createReview)

module.exports = router;
