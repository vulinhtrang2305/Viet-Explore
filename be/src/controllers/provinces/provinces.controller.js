const Province = require("../../models/Provinces/provinces.model");

module.exports = {
    getAllProvince: async (req, res) => {
        try {
            const pro = await Province.find();
            if (!pro.length) {
                return res.status(404).json({ message: "No provinces found." });
            }

            return res.json({ message: "Data Successfully!", data: pro });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};