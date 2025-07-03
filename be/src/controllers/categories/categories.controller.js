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
    },

    createCategory: async (req, res) => {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(500).json({ message: error.message });
            }
            const newCat = new Category({ name });
            const saveCat = await newCat.save();
            // return res.json({ ...savePro.toObject(), release: formatDate(savePro.release) })
            return res.json(saveCat)

        } catch (error) {
            return res.json({ message: error.message })
        }
    }
};