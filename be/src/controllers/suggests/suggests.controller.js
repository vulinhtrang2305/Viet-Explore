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
    }
};
