const User = require("../../models/Users/user.model");
const { hashMake, hashCheck } = require("../../utils/hash");
const { createAccessToken } = require("../../utils/jwt");

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

    login: async (req, res) => {
        try {
            const body = req.body;
            if (!body.email || !body.password) {
                return res
                    .status(200)
                    .json({ message: "nhap thieu thong tin vui long nhap lai" });
            }
            // tim xem co user ko
            // ko co thi bao loi
            const user = await User.findOne({ email: body.email });
            if (!user) {
                return res.status(500).json({ message: "tai khoan nay khong ton tai" });
            } else {
                // tài khoản tồn tại thì check password
                // password ma nguoi dung vut xuong la body.password
                const checkPassword = await hashCheck(body.password, user.password);

                if (!checkPassword) {
                    return res.status(500).json({ message: "Sai mat khau" });
                }

                // neu password thong qua thi check tiep
                if (user.status === false) {
                    return res.status(500).json({ message: "Tai khoan cua ban da bi khoa" });
                }
            }

            // tao token (access token)
            const Token = await createAccessToken({
                id: user._id
            })

            return res.json({ message: "login thành công", data: Token })

        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },
};
