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

            if (!userId || !spotId || !rating) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const newReview = new Review({
                userId,
                spotId,
                rating,
                comment,
                imageUrl: imageUrl ? (Array.isArray(imageUrl) ? imageUrl : [imageUrl]) : []
            });

            const saved = await newReview.save();
            return res.status(201).json(saved);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    updateReview: async (req, res) => {
        try {
            const { id } = req.params;
            const { userId, spotId, rating, comment, imageUrl } = req.body;

            // Kiểm tra đầu vào
            if (!userId || !spotId || !rating || !comment || !imageUrl) {
                return res.status(400).json({ message: "Missing required fields: name, region, regionCode." });
            }

            // Tìm và cập nhật review
            const updated = await Review.findByIdAndUpdate(
                id,
                { userId, spotId, rating, comment, imageUrl },
                { new: true }
            );

            if (!updated) {
                return res.status(404).json({ message: "Province not found." });
            }

            return res.json({ message: "Province updated successfully!", data: updated });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    
    deleteReview: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: "Missing review ID." });
            }

            const deleted = await Review.findByIdAndDelete(id);

            if (!deleted) {
                return res.status(404).json({ message: "Review not found." });
            }

            return res.json({ message: "Review deleted successfully!", data: deleted });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};