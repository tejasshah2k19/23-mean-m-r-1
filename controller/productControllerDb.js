const ProductModel = require("../model/productModel")

module.exports.addProduct = function (req, res) {

    console.log(req.body);

    let productName = req.body.productName
    let price = req.body.price
    let qty = req.body.qty

    let product = new  ProductModel({
        "productName":productName,
        "price":price,
        "qty":qty
    });

    product.save();
    
    res.json({ "msg": "Product Added", "data": product, "rcode": 200 })
}

// //nodeJs -> singlethread -> async 
// module.exports.getAllProducts = function(req,res){
//   ProductModel.find(function(err,data){
//     if(err){
//         res.json({"msg":"SMW","rcode":-9,"data":err})
//     }else{
//         res.json({"msg":"Product list","data":data,"rcode":200})  
//     }
//   }) //     
// //log --> print

// }

//nodeJs -> singlethread -> async 
module.exports.getAllProducts = function(req,res){
    ProductModel.find().then((data)=>{
        res.json({"msg":"Product list","data":data,"rcode":200})  
    }).catch((err)=>{
        res.json({"msg":"SMW","rcode":-9,"data":err})
    })
  }
  
  //getprodcut/1 
 module.exports.getProductById = function(req,res){
    let productId = req.params.productId 
    ProductModel.findById({_id:productId}).then((data)=>{
        res.json({"msg":"Product Ret","data":data,"rcode":200})  
    }).catch((err)=>{
        res.json({"msg":"SMW","rcode":-9,"data":err})  
    })
 } 

 //deletebyid 
module.exports.deleteProductById = function(req,res){
    let productId = req.params.productId

    ProductModel.findByIdAndDelete({_id:productId}).then((data)=>{
        res.json({"msg":"Product Deleted","data":data,"rcode":200})  
    }).catch((err)=>{
        res.json({"msg":"SMW","rcode":-9,"data":err})  
    })
}

