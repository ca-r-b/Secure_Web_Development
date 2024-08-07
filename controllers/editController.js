const bcrypt = require("bcryptjs");
const User = require("../models/User");
const path = require("path");
const loginLimiter = require("../middleware/loginLimiter"); // Import the rate limiter
const errorHandler = require('../middleware/errorHandler');
const db = require("../db");

const editController = {
  getEdit: (req, res) => {
    if (!req.session.isLoggedIn) {
      res.render("login", { title: "Login", msg: ""});
    } else { 
        res.render("edit", { title: "Edit Details", session: req.session});
    }
  },

  postEdit: (req, res) => {
    try {
          const { editPhone } = req.body;
          const uid = req.session.user.id;

        
          User.updatePhoneNum(uid, editPhone, (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).send("Database error");
            }
            res.redirect('/home');
          });
          
      } catch(e){
          console.log('Error POST edit ' + e);
          res.redirect("/logout");
      }
  },


};

module.exports = editController;
