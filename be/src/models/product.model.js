const mongoose = require("mongoose")
// de ref dc den bang category thi phai import category vao cho no hieu

const Category = require("./category.model")
const productSchema = new mongoose.Schema({
    // mac dinh _id mongoose tu tao
    name: {
        type: String,
        require: true,
        unique: true,
        minlength: [4, "name must at least 4 characters long"],
        maxlength: 50
    },
    price: Number,
    stock: Number,
    // category cos dinh dang object id => ref den bang category
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category" // Category o day chinh la cai category nay: mongoose.model("Category", categorySchema);
    }
}, { timestamps: false, versionKey: false })

const product = mongoose.model("Product", productSchema);
module.exports = product