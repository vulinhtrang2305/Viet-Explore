const mongoose = require("mongoose")

const Spot = require("../Spots/spots.model")

const suggestsSchema = new mongoose.Schema({
    title: String,
    description: String,
    spotId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Spot"
        }
    ]
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model("Suggest", suggestsSchema);