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

    
    postRegister: async (req, res) => {
        try {
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const email = req.body.email;
            const password1 = req.body.password1;
            const phone = req.body.phone;
            // const profilePicture = req.body.profilePicture;
            
            const saltRounds = 10;
            const hash = await bcrypt.hash(password1, saltRounds);



            console.log("INFO");
            console.log(firstName);
            console.log(lastName);
            console.log(email);
            console.log(password1);
            console.log(phone);
            // console.log(profilePicture);



            const userData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash,
                phoneNum: phone,
                picPath: "/test", // temporary, set default value
                userType: "student" // temporary, set default value
            };

            console.log(userData);

            User.create(userData, (err, results) => {
                if (err) {
                    return res.status(500).send("Database errorRRRRRRRR");
                }
                res.redirect('/');
            });
        } catch (err) {
            res.status(500).send("Server error");
        }
    },
};

module.exports = userController;