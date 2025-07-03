const Suggest = require("../../models/Suggests/suggests.model");

module.exports = {
    getAllSuggest: async (req, res) => {
        try {
            const sugg = await Suggest.find();

            if (!sugg.length) {
                return res.status(404).json({ message: "No suggest found." });
            }

            return res.json({ message: "Data Successfully!", data: sugg });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    createSuggest: async (req, res) => {
        try {
            const { title, description, imageUrl, spotId } = req.body;

            if (!title || !description || !imageUrl || !spotId) {
                return res.status(500).json({ message: error.message });
            }
            const newSuggest = new Suggest({ title, description, imageUrl, spotId });
            const savePro = await newSuggest.save();
            return res.json(savePro)

        } catch (error) {
            return res.json({ message: error.message })
        }
    },

    updateSuggest: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description, imageUrl, spotId } = req.body;

            // Kiểm tra đầu vào
            if (!title || !description || !imageUrl || !spotId) {
                return res.status(400).json({ message: "Missing required fields: title, description, imageUrl, spotId." });
            }

            // Cập nhật gợi ý
            const updated = await Suggest.findByIdAndUpdate(
                id,
                { title, description, imageUrl, spotId },
                { new: true }
            );

            if (!updated) {
                return res.status(404).json({ message: "Suggest not found." });
            }

            return res.json({ message: "Suggest updated successfully!", data: updated });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    deleteSuggest: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: "Missing suggest ID." });
            }

            const deleted = await Suggest.findByIdAndDelete(id);

            if (!deleted) {
                return res.status(404).json({ message: "Suggest not found." });
            }

            return res.json({ message: "Suggest deleted successfully!", data: deleted });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

};
