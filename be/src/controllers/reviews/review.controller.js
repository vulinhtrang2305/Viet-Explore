const Review = require("../../models/Reviews/review.model");

module.exports = {
    getAllReview: async (req, res) => {
        try {
            const re = await Review.find();
            if (!re.length) {
                return res.status(404).json({ message: "No reviews found." });
            }

            return res.json({ message: "Data Successfully!", data: re });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};