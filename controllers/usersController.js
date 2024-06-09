const bcrypt = require('bcryptjs');
const User = require('../models/User');

const userController = {
    getLogin: (req, res) => {
        res.render("login", { title: "Login", msg: "" });
    },

    postLogin: (req, res) => {
        User.findByEmail(req.body.email, (err, user) => {
            if (err) {
                return res.status(500).send("Database error");
            }
            if (!user || !bcrypt.compareSync(req.body.pass, user.password)) {
                return res.render("login", { title: "Login", msg: "Wrong credentials." });
            }
            res.send("Welcome to the page!");
        });
    },

    getRegister: (req, res) => {
        res.render("register", { title: "Register", msg: "" });
    },

    postRegister: (req, res) => {
        // TODO - Add fullName
        // TODO - Add filePath
        const { email, pass } = req.body;
        const salt = 10;
        const hash = bcrypt.hashSync(pass, salt);

        const userData = { email, password: hash };

        User.create(userData, (err, results) => {
            if (err) {
                return res.status(500).send("Database error");
            }
            res.redirect('/');
        });
    }
};

module.exports = userController;