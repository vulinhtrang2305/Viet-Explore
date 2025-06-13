const mongoose = require("mongoose")

const User = require("../Users/user.model")
const Spot = require("../Spots/spots.model")

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    spotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Spot"
    },
    rating: Number, 
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: false, versionKey: false })

module.exports = mongoose.model("Review", reviewSchema);