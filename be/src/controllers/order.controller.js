// const Order = require("../models/order.model")

// module.exports = {
//     getOrderBYCustomerId: async (req, res) => {
//         try {
//             const cusId = req.params.customerId;
//             // search order by customerId
//             // find: customerId lay theo ten truong trong collection con cusId o phia tren
//             const orders = await Order.find({ customerId: cusId }).populate("products.productId");
//             // map
//             const newOrder = orders.map((ord) => {
//                 return {
//                     id: ord._id,
//                     orderDate: ord.orderDate,
//                     products: ord.products.map((pro) => {
//                         return {
//                             _id: pro.productId._id,
//                             name: pro.productId.name,
//                             price: pro.productId.price,
//                         }
//                     })
//                 }
//             })
//             return res.json(newOrder)

//         } catch (error) {
//             return res.status(500).json({
//                 message: error.message,
//             });
//         }
//     }
// }