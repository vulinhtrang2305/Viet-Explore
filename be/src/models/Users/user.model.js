const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phone: Number,
    address: String,
    dob: {
        type: Date,
        default: new Date()
    }
}, { timestamps: false, versionKey: false })

module.exports = mongoose.model("User", userSchema);