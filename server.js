require('dotenv').config();

const mysql = require("mysql2");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const rateLimit = require('express-rate-limit');
const app = express();

// Rate limiter middleware
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per windowMs
    message: "Too many login attempts from this IP, please try again after 15 minutes",
    headers: true,
    handler: (req, res, next, options) => {
        res.status(options.statusCode).render("login", { title: "Login", msg: options.message });
    }
});
// Apply rate limiter to login route
app.use("/login", loginLimiter);

app.set("view engine", "ejs");

// For Views
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.use(express.static("public"));

// For Backend
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));

// Route setup
const authRouter = require("./routes/route.js");
app.use("/", authRouter);

// Apply rate limiter to login route
app.post("/", loginLimiter, (req, res) => {
    const { email, pass } = req.body;

    // Find user by email
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).send("Database error");
        }
        if (results.length === 0 || !bcrypt.compareSync(pass, results[0].password)) {
            return res.render("login", { title: "Login", msg: "Wrong credentials." });
        }
        res.redirect('/home');
    });
});

app.listen(3000, function() {
    console.log("Server is running.");
});