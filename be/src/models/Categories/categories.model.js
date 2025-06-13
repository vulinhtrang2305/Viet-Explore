const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: String,
}, { timestamps: false, versionKey: false })

module.exports = mongoose.model("Category", categorySchema);