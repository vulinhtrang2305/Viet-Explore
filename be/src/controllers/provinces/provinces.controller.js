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

            if (!name || !region || !regionCode) {
                return res.status(500).json({ message: error.message });
            }
            const newProvince = new Province({ name, region, regionCode });
            const savePro = await newProvince.save();
            return res.json(savePro)

        } catch (error) {
            return res.json({ message: error.message })
        }
    },

    updateProvince: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, region, regionCode } = req.body;

            // Kiểm tra đầu vào
            if (!name || !region || !regionCode) {
                return res.status(400).json({ message: "Missing required fields: name, region, regionCode." });
            }

            // Tìm và cập nhật province
            const updated = await Province.findByIdAndUpdate(
                id,
                { name, region, regionCode },
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

    deleteProvince: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: "Missing province ID." });
            }

            const deleted = await Province.findByIdAndDelete(id);

            if (!deleted) {
                return res.status(404).json({ message: "Province not found." });
            }

            return res.json({ message: "Province deleted successfully!", data: deleted });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

};