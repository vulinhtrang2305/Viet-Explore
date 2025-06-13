const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: String,
    description: String,
    // gender: {
    //     enum: ["male", "female"] // try catch , error -> message: loi tra ve enum khi ng dung nhap sai dinh dang
    // }
}, { timestamps: false, versionKey: false })

const category = mongoose.model("Category", categorySchema);
module.exports = category