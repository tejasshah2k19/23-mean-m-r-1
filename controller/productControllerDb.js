const ProductModel = require("../model/productModel")

function addProduct(req, res) {
    let productName = req.body.productName
    let price = req.body.price
    let qty = req.body.qty
    
    console.log(ProductModel);

    let product = new  ProductModel({
        "productName":productName,
        "price":price,
        "qty":qty
    });

    product.save();


    
    res.json({ "msg": "Product Added", "data": product, "rcode": 200 })
}


module.exports.addProduct = addProduct