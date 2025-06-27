const bcrypt = require('bcryptjs');

module.exports = {
    hashMake: async (password) => {
        try {
            return await bcrypt.hash(password, 10);
        } catch (error) {
            console.error("Error hashing password:", error);
            return null;
        }
    },

    hashCheck: async (password, hash) => {
        try {
            return await bcrypt.compare(password, hash);
        } catch (error) {
            console.error("Error comparing password:", error);
            return false;
        }
    }
};
