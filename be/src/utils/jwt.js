const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = {
    createAccessToken: async (data) => {
        try {
            return jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });
        } catch (error) {
            console.error("Error creating access token:", error);
            return null;
        }
    },

    verifyToken: async (token) => {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (error) {
            return null;
        }
    },

    createRefreshToken: async (data = "") => {
        try {
            return jwt.sign(
                { data: Math.random() + new Date().getTime() },
                JWT_SECRET,
                { expiresIn: "1d" }
            );
        } catch (error) {
            console.error("Error creating refresh token:", error);
            return null;
        }
    },
};
