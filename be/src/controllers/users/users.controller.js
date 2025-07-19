const User = require("../../models/Users/user.model");
const { hashMake, hashCheck } = require("../../utils/hash");
const { createAccessToken } = require("../../utils/jwt");
const BlackListToken = require("../../models/BlackList/blackList.model");

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

    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const { username, email, phone, address, dob } = req.body;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "Người dùng không tồn tại" });
            }

            user.username = username || user.username;
            user.email = email || user.email;
            user.phone = phone || user.phone;
            user.address = address || user.address;
            user.dob = dob || user.dob;

            const updatedUser = await user.save();

            const userData = {
                ...updatedUser._doc,
                password: "not show",
            };

            return res.json({ message: "Cập nhật thành công", user: userData });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            if (!email || !password || !username) {
                return res.json({
                    message: "Nhập thiếu thông tin vui lòng nhâp lại",
                });
            }
            // validate
            const userExist = await User.findOne({ email });
            if (userExist) {
                return res.status(500).json({ message: "Tài khoản đã tồn tại trước đó" });
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
                    .json({ message: "Nhập thiếu thông tin vui lòng nhập lại" });
            }
            // tim xem co user ko
            // ko co thi bao loi
            const user = await User.findOne({ email: body.email });
            if (!user) {
                return res.status(500).json({ message: "Tài khoản này không tồn tại" });
            } else {
                // tài khoản tồn tại thì check password
                // password ma nguoi dung vut xuong la body.password
                const checkPassword = await hashCheck(body.password, user.password);

                if (!checkPassword) {
                    return res.status(500).json({ message: "Sai mật khẩu" });
                }

                // neu password thong qua thi check tiep
                if (user.status === false) {
                    return res.status(500).json({ message: "Tài khoản của bạn đã bị khóa" });
                }
            }

            // tao token (access token)
            const Token = await createAccessToken({
                id: user._id
            })

            // .doc de hien lay dc het du lieu
            const userData = {
                ...user._doc,
                password: 'not show'
            }

            return res.json({ message: "Login thành công", Token, user: userData })

        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    getProfile: async (req, res) => {
        try {
            const user = req.user;
            return res.json({ message: "Lấy thông tin thành công", user })
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    logout: async (req, res) => {
        try {
            const accessToken = req.accessToken;
            if (!accessToken) {
                return res.json({ message: "Bạn không có quyền truy cập" })
            }

            await BlackListToken.create({ token: accessToken });


            return res.json({
                message: "Đăng xuất thành công"
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const deletedUser = await User.findByIdAndDelete(userId);

            if (!deletedUser) {
                return res.status(404).json({ message: "Không tìm thấy người dùng." });
            }

            return res.status(200).json({ message: "Xóa người dùng thành công." });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    
};
