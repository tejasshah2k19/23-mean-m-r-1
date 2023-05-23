const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  qty: Number
});


module.exports  = mongoose.model('Product', ProductSchema); //products 
 
//name , price , qty -> 
//db.product.insertOne({})

//ProductModel -> class 
// object -> save() 
//db.product.insertOne({})



