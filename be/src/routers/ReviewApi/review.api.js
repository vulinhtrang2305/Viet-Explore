const express = require("express");
const router = express.Router();
const ReviewController = require("../../controllers/reviews/review.controller");

router.get("/reviews", ReviewController.getAllReview)
router.post("/reviews/create", ReviewController.createReview)
router.put("/reviews/update/:id", ReviewController.updateReview)
router.delete("/reviews/delete/:id", ReviewController.deleteReview)

module.exports = router;
