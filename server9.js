const express = require("express")
const app = express()
const productRoute = require("./routes/product.routes")
const mongoose = require("mongoose")
const categoryController = require("./controller/categoryController")
//middle 
app.use(express.urlencoded({extended:true}))
app.use(express.json())


//product 
app.use("/admin",productRoute)
 
//category routes 
app.post("/category",categoryController.addCategory)
app.get("/categories",categoryController.getAllCategory) 

//http://localhost:9999/admin/


//login 

//db
mongoose.connect("mongodb://127.0.0.1:27017/mean23").then( () => {
    console.log("dbConnected...");
})

app.listen(9999)