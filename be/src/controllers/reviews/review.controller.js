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
    },

    createReview: async (req, res) => {
        try {
            const { userId, spotId, rating, comment, imageUrl } = req.body;

            if (!userId, !spotId, !rating, !comment, !imageUrl) {
                return res.status(500).json({ message: error.message });
            }
            const newreview = new Province({ userId, spotId, rating, comment, imageUrl });
            const savePro = await newreview.save();
            return res.json(savePro)

        } catch (error) {
            return res.json({ message: error.message })
        }
    }
};