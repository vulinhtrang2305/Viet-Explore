const mongoose = require("mongoose")

const Province = require("../Provinces/provinces.model")
const Category = require("../Categories/categories.model")

const spotSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    provinceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Province"
    },
    region: {
        enum: ["Bắc", "Trung", "Nam"]
    },
    type: String,
    imageUrl: String,
    description: String,
    location: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    },
    isFavorite: String,
    regionGroup: {
        enum: ["mien-bac", "mien-trung", "mien-nam"]
    },
    regionCode: String,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
}, { timestamps: false, versionKey: false })

module.exports = mongoose.model("Spot", spotSchema);
