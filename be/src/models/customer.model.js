const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    phone: Number
}, { timestamps: false })

const customer = mongoose.model("Customer", customerSchema);
module.exports = customer