const mysql = require("mysql");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

// Route setup
const authRouter = require("./routes/auth.js");

app.set("view engine", "ejs");

// For Views
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.use(express.static("public"));

// For Backend
app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(){
    console.log("Server is running.");
});

// Routes
app.use("/", authRouter);