const mongoose = require("mongoose");
const product = require("./product.model");
const Customer = require("./customer.model");

const productEmbedded = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: Number
})

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    products: [productEmbedded],
    name: String,
    totalPrice: Number,
    // mqh : 1 - nhieu
    // nhin de nay thay trong product co id tu sinh (_id) thì tức là nó cũng là 1 schema khác => Embedded data
    orderDate: {
        type: Date,
        // default: Date.now
        default: new Date()
    }
}, { timestamps: false })

const order = mongoose.model("Order", orderSchema);
module.exports = order