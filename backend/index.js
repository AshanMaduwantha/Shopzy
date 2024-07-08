const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");

app.use(express.json());
app.use(cors());

//Databse Connection With MongoDB
mongoose.connect("mongodb+srv://ashan23:200011401312@testing.2npte0k.mongodb.net/Testing");

//API Creation
app.get("/",(req,res)=>{
    res.send("Express App is Running");
})


//Image Storage Engine 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
  })

const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
      success: 1,
      image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
  })


// Schema for creating Product
const Product = mongoose.model("Product", {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number },
    old_price: { type: Number },
    date: { type: Date, default: Date.now },
    avilable: { type: Boolean, default: true },
  });


app.listen(port, (error)=>{
    if(!error){
        console.log("Sever Running on Port "+port);
    }
    else{
        console.log("Error : "+error);
    }
})
