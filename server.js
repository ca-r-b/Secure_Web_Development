require('dotenv').config();

const mysql = require("mysql2");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const session = require('express-session');
const path = require('path');
const rateLimit = require('express-rate-limit');
const app = express();
const helmet = require('helmet');
const cors = require('cors');

app.set("view engine", "ejs");

// Use Helmet to set various HTTP headers for security
app.use(helmet());

// Enable CORS for all routes (for development)
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate limiter middleware
const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 3, // Limit each IP to 3 login requests per windowMs
    message: "Too many login attempts, please try again after a minute",
    headers: true,
    handler: (req, res, next, options) => {
        res.status(options.statusCode).render("login", {
            title: "Login",
            msg: options.message
        });
    }
});

// For Views
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.use(express.static("public"));

// For Backend
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));

// Session setup
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Route setup
const authRouter = require("./routes/route.js");
app.use("/", authRouter);

app.listen(3000, function() {
    console.log("Server is running.");
});