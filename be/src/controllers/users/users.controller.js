const User = require("../../models/Users/user.model");
const { hashMake } = require("../../utils/hash");

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
    },

    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            if (!email || !password || !username) {
                return res.json({
                    message: "nhập thiếu thông tin vui lòng nhâp lại",
                });
            }
            // validate
            const userExist = await User.findOne({ email });
            if (userExist) {
                return res.status(500).json({ message: "User da ton tai" });
            }

            const passwordHash = await hashMake(password);
            const user = await User.create({
                username,
                email,
                password: passwordHash,
            });

            return res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
};
