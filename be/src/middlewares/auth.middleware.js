const User = require("../models/Users/user.model");
const BlackListToken = require("../models/BlackList/blackList.model");
const { verifyToken } = require("../utils/jwt");

module.exports = async (req, res, next) => {
    try {
        // const accessToken = req.headers["authorization"];
        const accessToken = req.get("authorization")?.split(" ").slice(-1).join("");
        if (!accessToken) {
            return res.json({ message: "Token này đã hết hạn và bạn không có quyền truy cập" })
        }

        const blacklist = await BlackListToken.findOne({ token: accessToken })
        if (blacklist) {
            return res.json({ message: "Bạn không có quyền truy cập" })
        }

        // tra ve true/ false
        // giai ma token
        const decode = await verifyToken(accessToken)
        if (!decode) {
            return res.json({ message: "Token không hợp lệ" })
        }

        const userId = decode?.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ message: "Không tìm thấy tài khoản này" })
        }

        const newUser = {
            id: user._id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            dob: user.dob,
            address: user.address
        }

        req.user = newUser;
        req.accessToken = accessToken;

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}