const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require('path');

const userController = {
    // ============================ Login & Logout ============================
    // TODO - Add for sessions
    // getLogin: (req, res) => {
    //     if(!req.session.isLoggedIn){
    //         res.render("login", {title: "Login", msg: ""});
    //     }else{
    //         res.redirect("/home");
    //     }
    // },

    getLogin: (req, res) => {
        res.render("login", {title: "Login", msg:""});
    },

    postLogin: (req, res) => {
        let sql = "SELECT * FROM records.users WHERE username='" + req.body.username + "';";

        db.query(sql, (err, results, fields) => {
            if(err){
                throw err;
            }else{
                // Compare password from DB
                if(bcrypt.compareSync(req.body.pass, results[0].password)){
                    // Welcome Page
                    res.send("Welcome to the page!");
                }else{
                    // Prompt user that it is incorrect
                    res.send("Wrong credentials.");
                }
            }
        });
    },

    getRegister: (req, res) => {
        res.render("register", {title: "Register", msg:""});
    },

    postRegister: (req, res) => {
        // TODO - Add fullName
        // TODO - Add filePath
        var username = req.body.username;
        var password = req.body.pass;
        const salt = 10;

        // Hash Password
        var hash = bcrypt.hashSync(password, salt);
        let data = {username: username, password: hash};

        // Insert data into the database
        let sql = "INSERT INTO users SET ?";
        let query = db.query(sql, data, (err, results) => {
            if(err) throw err;
            res.redirect('/');
        });
    }
}

module.exports = userController;