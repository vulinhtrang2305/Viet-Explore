const { Schema, model } = require("mongoose")

// blacklist dung de luu token cua ng dung khi nguoi dung dang xuat
const BlackListSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
}, { timestamps: true })

module.exports = model("BlackList", BlackListSchema)