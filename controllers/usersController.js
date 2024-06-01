const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require('path');

const userController = {
    // ============================ Login & Logout ============================
    // getLogin: (req, res) => {
    //     if(!req.session.isLoggedIn){
    //         res.render("login", {title: "Login", msg: ""});
    //     }else{
    //         res.redirect("/home");
    //     }
    // },

    getLogin: (req, res) => {
        res.render("login", {title: "Login"});
    }
}

module.exports = userController;