const Spot = require("../../models/Spots/spots.model");

module.exports = {
    getAllSpot: async (req, res) => {
        try {
            const spots = await Spot.find();

            if (!spots.length) {
                return res.status(404).json({ message: "No spots found." });
            }

            return res.json({ message: "Data Successfully!", data: spots });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    createSpot: async (req, res) => {
        try {
            const { name, provinceId, region, type, imageUrl, description, location, isFavorite, regionGroup, regionCode, categoryId } = req.body;

            if (!name || !provinceId || !region || !type || !imageUrl || !description || !location || !isFavorite || !regionGroup || !regionCode || !categoryId) {
                return res.status(500).json({ message: error.message });
            }
            const newSpot = new Spot({ name, provinceId, region, type, imageUrl, description, location, isFavorite, regionGroup, regionCode, categoryId });
            const savePro = await newSpot.save();
            return res.json(savePro)

        } catch (error) {
            return res.json({ message: error.message })
        }
    },

    updateSpot: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, provinceId, region, type, imageUrl, description, location, isFavorite, regionGroup, regionCode, categoryId } = req.body;

            // Kiểm tra đầu vào
            if (!name || !provinceId || !region || !type || !imageUrl || !description || !location || !isFavorite || !regionGroup || !regionCode || !categoryId) {
                return res.status(400).json({ message: "Missing required fields: name, region, regionCode." });
            }

            // Tìm và cập nhật review
            const updated = await Spot.findByIdAndUpdate(
                id,
                { name, provinceId, region, type, imageUrl, description, location, isFavorite, regionGroup, regionCode, categoryId },
                { new: true }
            );

            if (!updated) {
                return res.status(404).json({ message: "Province not found." });
            }

            return res.json({ message: "Province updated successfully!", data: updated });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
