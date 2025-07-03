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
    },

    updateCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            // Kiểm tra đầu vào
            if (!name || !id) {
                return res.status(400).json({ message: "Missing required fields: 'id' or 'name'." });
            }

            // Tìm và cập nhật category
            const updated = await Category.findByIdAndUpdate(
                id,
                { name },
                { new: true } // Trả về document sau khi update
            );

            if (!updated) {
                return res.status(404).json({ message: "Category not found." });
            }

            return res.json({ message: "Category updated successfully!", data: updated });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params;

            // Kiểm tra xem ID có được truyền không
            if (!id) {
                return res.status(400).json({ message: "Missing category ID." });
            }

            // Tìm và xóa category
            const deleted = await Category.findByIdAndDelete(id);

            if (!deleted) {
                return res.status(404).json({ message: "Category not found." });
            }

            return res.json({ message: "Category deleted successfully!", data: deleted });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }


};