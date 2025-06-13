const User = require("../../models/Users/user.model");

module.exports = {
    getAllUser: async (req, res) => {
        try {
            const userFind = await User.find();

            if (!userFind.length) {
                return res.status(404).json({ message: "No user found." });
            }

            return res.json({ message: "Data Successfully!", data: userFind });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
