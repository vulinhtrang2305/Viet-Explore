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
    }
};
