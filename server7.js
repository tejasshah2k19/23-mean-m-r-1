const express = require("express")
const mongoose = require("mongoose")
const productController = require("./controller/productControllerDb")
const categoryController = require("./controller/categoryController")
const industryController = require("./controller/industryController")
const equityController = require("./controller/equityController")

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/mean23").then( () => {
    console.log("dbConnected...");
})
 

//product routes 
app.post("/addproduct2",productController.addProduct)
app.get("/products",productController.getAllProducts)
app.get("/product/:productId",productController.getProductById)
app.delete("/product/:productId",productController.deleteProductById)
app.post("/products/filter",productController.filterProducts)
app.put("/product",productController.updateProduct)

//slider - filter 

// min 500 max 5000 
// category iphone 
// storage 256gb

//category routes 
app.post("/category",categoryController.addCategory)
app.get("/categories",categoryController.getAllCategory) 

//industry Routes 
app.post("/industry",industryController.uploadIndustry) 

//equity routes
app.post("/equity",equityController.uploadEquity)
app.get("/equity",equityController.getAllEquity)

app.listen(9999)

