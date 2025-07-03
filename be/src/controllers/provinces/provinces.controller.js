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
    },

    createProvince: async (req, res) => {
        try {
            const { name, region, regionCode } = req.body;

            if (!name, !region, !regionCode) {
                return res.status(500).json({ message: error.message });
            }
            const newProvince = new Province({ name, region, regionCode });
            const savePro = await newProvince.save();
            return res.json(savePro)

        } catch (error) {
            return res.json({ message: error.message })
        }
    }
};