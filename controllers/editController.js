const bcrypt = require("bcryptjs");
const User = require("../models/User");
const path = require("path");
const loginLimiter = require("../middleware/loginLimiter"); // Import the rate limiter
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
            if (err) return next(err);
            // TODO: Add Logger
            res.redirect('/home');
          });
          
      } catch(e){
          next(e);
      }
  },


};

module.exports = editController;
