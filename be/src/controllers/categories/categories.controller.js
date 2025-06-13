const Category = require("../../models/Categories/categories.model");

module.exports = {
    getAllCategory: async (req, res) => {
        try {
            const cat = await Category.find();
            if (!cat.length) {
                return res.status(404).json({ message: "No Categories found." });
            }

            return res.json({ message: "Data Successfully!", data: cat });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};