const bcrypt = require("bcryptjs");
const User = require("../models/User");
const path = require("path");
const loginLimiter = require("../middleware/loginLimiter"); // Import the rate limiter
const db = require("../db");
const { logPhoneNumEdited, logAccountEdited } = require('../utils/logger');

const editController = {
    getEdit: (req, res) => {
        if (!req.session.isLoggedIn) {
            res.render("login", { title: "Login", msg: "" });
        } else {
            res.render("edit", { title: "Edit Details", session: req.session });
        }
    },

    postEdit: (req, res) => {
        try {
            const { editPhone } = req.body;
            const uid = req.session.user.id;

            User.updatePhoneNum(uid, editPhone, (err, results) => {
                if (err) {
                    logPhoneNumError(uid, err);
                    return next(err);
                }

                logPhoneNumEdited(uid, editPhone);
                res.redirect('/home');
            });

        } catch (e) {
            next(e);
        }
    },
};

module.exports = editController;