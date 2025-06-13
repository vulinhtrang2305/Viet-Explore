const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
}, { timestamps: false, versionKey: false })

module.exports = mongoose.model("User", userSchema);