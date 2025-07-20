const Favourite = require("../../models/Favourites/favourite.model");

module.exports = {
    getAllFavourite: async (req, res) => {
        try {
            const fav = await Favourite.find();
            if (!fav.length) {
                return res.status(404).json({ message: "Không có dữ liệu yêu thích." });
            }
            return res.status(200).json({ message: "Lấy dữ liệu thành công", data: fav });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getFavouriteByUser: async (req, res) => {
        const { userId } = req.params;

        try {
            const fav = await Favourite.findOne({ userId });

            if (!fav || !fav.spotId || fav.spotId.length === 0) {
                return res.status(200).json({
                    message: "Không có địa điểm yêu thích",
                    data: { userId, spotId: [] }, // Giúp FE không bị null
                });
            }

            return res.status(200).json({ message: "Lấy dữ liệu thành công", data: fav });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    addToFavouriteL: async (req, res) => {
        const { userId, spotId } = req.body;

        try {
            let favourite = await Favourite.findOne({ userId });

            if (!favourite) {
                const newFavourite = new Favourite({
                    userId,
                    spotId: [spotId],
                });
                await newFavourite.save();

                return res.status(200).json({
                    message: "Đã thêm vào mục yêu thích",
                    data: newFavourite,
                });
            }

            if (!favourite.spotId.includes(spotId)) {
                favourite.spotId.push(spotId);
                await favourite.save();
            }

            return res.status(200).json({
                message: "Đã thêm vào mục yêu thích",
                data: favourite,
            });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    deleteFavourite: async (req, res) => {
        const { userId, spotId } = req.params;

        try {
            const favourite = await Favourite.findOne({ userId });

            if (!favourite) {
                return res.status(404).json({
                    message: "Không tìm thấy danh sách yêu thích cho người dùng.",
                });
            }

            // Lọc lại các địa điểm yêu thích, loại bỏ spotId cần xoá
            const updatedSpotIds = favourite.spotId.filter(id => id.toString() !== spotId);

            if (updatedSpotIds.length === 0) {
                // Không còn địa điểm nào → xoá luôn bản ghi
                await Favourite.deleteOne({ userId });
                return res.status(200).json({
                    message: "Đã xoá địa điểm và danh sách yêu thích vì không còn địa điểm nào.",
                });
            }

            // Cập nhật lại danh sách địa điểm
            favourite.spotId = updatedSpotIds;
            await favourite.save();

            return res.status(200).json({
                message: "Đã xoá địa điểm khỏi yêu thích.",
                data: favourite,
            });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
};
