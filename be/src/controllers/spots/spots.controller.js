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

            if (!name, !provinceId, !region, !type, !imageUrl, !description, !location, !isFavorite, !regionGroup, !regionCode, !categoryId) {
                return res.status(500).json({ message: error.message });
            }
            const newSpot = new Spot({ name, provinceId, region, type, imageUrl, description, location, isFavorite, regionGroup, regionCode, categoryId });
            const savePro = await newSpot.save();
            return res.json(savePro)

        } catch (error) {
            return res.json({ message: error.message })
        }
    }
};
