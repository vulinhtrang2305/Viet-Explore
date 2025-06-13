const mongoose = require("mongoose")

const User = require("../Users/user.model")
const Spot = require("../Spots/spots.model")

const favouriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    spotId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Spot"
        }
    ],
    regionCode: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

module.exports = mongoose.model("Favourite", favouriteSchema);