const express = require("express")
const mongoose = require("mongoose")
const productController = require("./controller/productControllerDb")


const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/mean23").then( () => {
    console.log("dbConnected...");
})


app.post("/addproduct2",productController.addProduct)





app.listen(9999)

