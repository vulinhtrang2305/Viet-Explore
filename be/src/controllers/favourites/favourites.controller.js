const Favourite = require("../../models/Favourites/favourite.model");

module.exports = {
    getAllFavourite: async (req, res) => {
        try {
            const fav = await Favourite.find();
            if (!fav.length) {
                return res.status(404).json({ message: "No favourites found." });
            }

            return res.json({ message: "Data Successfully!", data: fav });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};