// const { default: mongoose } = require("mongoose");
// const Product = require("../models/product.model");

// module.exports = {
//   getAll: async (req, res) => {
//     try {
//       // category: {
//       //        ...
//       //     }
//       // lay category tu ten bang viet trong product model

//       // ko lay id o bang phu (category)
//       const Pro = await Product.find().populate("category", "-_id");

//       // ko lay id o bang chinh (product)
//       // const Pro = await Product.find().populate("category", "-_id").select("-_id");

//       // const Pro = await Product.find().populate({
//       //   path: "category",
//       //   select: "-_id"
//       // });
//       return res.json({
//         message: "get data successful",
//         products: Pro
//       });
//     } catch (error) {
//       return res.status(500).json({
//         message: error.message,
//       });
//     }
//   },

//   updateProduct: async (req, res) => {
//     try {
//       // update theo id cua sp
//       const { productId } = req.params;
//       const body = req.body;
//       // const {name, price} = req.body;


//       // find by id and update
//       if (!mongoose.Types.ObjectId.isValid(productId)) {
//         return res.json({
//           message: "ko co id"
//         });
//       }


//       const product = await Product.findOne({ name: body.name });

//       if (!product) {
//         return res.json({
//           message: "ko co",
//         });
//       }

//       // TRA VE CAI VUA UPDATE THI THEM TRUE VAO
//       // const updateProduct = await Product.updateOne({ _id: productId }, body, { new: true });
//       // const updateProduct = await Product.updateOne({ _id: productId }, {name, price});

//       const updateProduct = await Product.findByIdAndUpdate({ _id: productId }, body, { new: true });

//       return res.json({updateProduct})
//     } catch (error) {
//       return res.status(500).json({
//         message: error.message,
//       });
//     }
//   },

//   deleteProduct: async(req, res) => {
//     try {
//       const { productId } = req.params;

//       if (!mongoose.Types.ObjectId.isValid(productId)) {
//         return res.json({
//           message: "ko co id"
//         });
//       }

//       const product = await Product.findOne(productId);

//       if (!product) {
//         return res.json({
//           message: "ko co",
//         });
//       }

//       const deleteProduct = await Product.findByIdAndDelete(productId);

//       // const deleteProduct = await Product.findByIdAndDelete(productId);

//       return res.json({ deleteProduct })

//     } catch (error) {
//       return res.status(500).json({
//         message: error.message,
//       });
//     }
//   },

//   createOrder: async (req, res) => {
//     try {

//       return res.json({
//         message: "create succesful",
//         body: body
//       })
      
//     } catch (error) {
//       return res.status(500).json({
//         message: error.message,
//       });
//     }
//   }
// };
