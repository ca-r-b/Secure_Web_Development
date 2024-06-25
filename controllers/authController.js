const bcrypt = require('bcryptjs');
const User = require('../models/User');
const path = require('path');
const loginLimiter = require('../middleware/loginLimiter'); // Import the rate limiter

const authController = {
    getLogin: (req, res) => {
        if(!req.session.isLoggedIn){
            res.render("login", {title: "Login", msg: ""});
        }else{
            if(req.session.user.userType === "admin") {
                res.redirect("/admin_home");
            } else if(req.session.user.userType === "student") {
                res.redirect("/home");
            } 
            res.redirect("/home");
        }
    },

    postLogin: [loginLimiter, (req, res) => { // Apply the rate limiter here
        User.findByEmail(req.body.email, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Database error");
            }
            if (!user || !bcrypt.compareSync(req.body.pass, user.password)) {
                return res.render("login", { title: "Login", msg: "Wrong credentials." });
            }

            req.session.user = user; // Store user information in the session

            if (user.userType === 'admin') {
                req.session.isLoggedIn = true;
                res.redirect('/admin_home'); // Redirect admin users to the admin page
            } else if (user.userType === 'student') {
                req.session.isLoggedIn = true;
                res.redirect('/home'); // Redirect student users to the student page
            } else {
                res.status(403).send("Forbidden"); // Handle unexpected user types
            }
        });
    }],

    getRegister: (req, res) => {
        res.render("register", { title: "Register", msg: "" });
    },

    postRegister: async(req, res) => {
        try {
            const { firstName, lastName, email, password1, phone } = req.body;
            const profilePicture = req.files.profilePicture;

            User.checkForDuplicates(email, phone, async(err, user) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Database error");
                }

                if (user.length === 0) {
                    const saltRounds = 10;
                    const hash = await bcrypt.hash(password1, saltRounds); // TODO - 10 Default

                    var extension = profilePicture.name.split('.').pop().toUpperCase();
                    const nextId = await User.getHighestIdPlusOne();

                    profilePicture.mv(path.resolve('public/images/', nextId + "_dp." + extension), function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Successful profile image upload!");
                        }
                    });

                    const imgPath = 'images/' + nextId + "_dp." + extension;
                    const userData = {
                        firstName,
                        lastName,
                        email,
                        password: hash,
                        phoneNum: phone,
                        picPath: imgPath,
                        userType: "student" // temporary, set default value
                    };

                    User.create(userData, (err, results) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).send("Database error");
                        }
                        res.redirect('/');
                    });

                } else {
                    res.render("register", { title: "Register", msg: "Invalid Credentials" });
                }

            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Server error");
        }
    }
};

module.exports = authController;