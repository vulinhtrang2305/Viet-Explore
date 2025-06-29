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
    },

    getFavouriteByUser: async (req, res) => {
        const { userId } = req.params;

        try {
            const fav = await Favourite.findOne({ userId });

            if (!fav) {
                return res.status(200).json({ message: "Không có địa điểm yêu thích", data: null });
            }

            return res.status(200).json({ message: "Lấy dữ liệu thành công", data: fav });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    addToFavouriteL: async (req, res) => {
        // const { userId, spotId } = req.body;

        // try {
        //     let favourite = await Favourite.findOne({ userId });

        //     if (!favourite) {
        //         // Nếu chưa có bản ghi nào cho user này thì tạo mới
        //         favourite = new Favourite({
        //             userId,
        //             spotId: [spotId],
        //         });
        //     } else {
        //         // Nếu đã có thì thêm spotId mới vào (tránh trùng lặp)
        //         if (!favourite.spotId.includes(spotId)) {
        //             favourite.spotId.push(spotId);
        //         }
        //     }

        //     await favourite.save();

        //     return res.status(200).json({
        //         message: "Đã thêm vào mục ưa thích",
        //         data: favourite,
        //     });
        // } catch (error) {
        //     return res.status(500).json({ message: error.message });
        // }

        const { userId, spotId } = req.body;

        try {
            const existingFavourite = await Favourite.findOne({ userId });

            if (!existingFavourite) {
                const newFavourite = new Favourite({
                    userId,
                    spotId: [spotId],
                });
                await newFavourite.save();
                return res.status(200).json({
                    message: "Đã thêm vào mục ưa thích",
                    data: newFavourite,
                });
            } else {
                if (!existingFavourite.spotId.includes(spotId)) {
                    existingFavourite.spotId.push(spotId);
                    await existingFavourite.save();
                }
                return res.status(200).json({
                    message: "Đã thêm vào mục ưa thích",
                    data: existingFavourite,
                });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};