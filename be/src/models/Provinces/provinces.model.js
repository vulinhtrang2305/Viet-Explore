const mongoose = require("mongoose")

const provinceSchema = new mongoose.Schema({
    name: String,
    region: String,
    regionCode: String
}, { timestamps: false, versionKey: false })

module.exports = mongoose.model("Province", provinceSchema);