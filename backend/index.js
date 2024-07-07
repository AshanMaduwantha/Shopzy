const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

//Databse Connection With MongoDB
mongoose.connect("mongodb+srv://ashan23:ashan23@testing.2npte0k.mongodb.net/Testing");