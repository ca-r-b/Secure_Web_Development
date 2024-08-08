const bcrypt = require("bcryptjs");
const User = require("../models/User");
const path = require("path");
const loginLimiter = require("../middleware/loginLimiter");
const db = require("../db");

const authController = {
    getLogin: (req, res) => {
        try {
            if (!req.session.isLoggedIn) {
                res.render("login", { title: "Login", msg: "" });
            } else {
                if (req.session.user.userType === "admin") {
                    res.redirect("/admin_home");
                } else if (req.session.user.userType === "student") {
                    res.redirect("/home");
                } else {
                    res.redirect("/home");
                }
            }
        } catch (err) {
            next(err);
        }
    },

    postLogin: [loginLimiter, (req, res) => {
        try {
            User.findByEmail(req.body.email, (err, user) => {
                if (err) return next(err);
                if (!user || !bcrypt.compareSync(req.body.pass, user.password)) {
                                // TODO: Add Logger
                    return res.render("login", { title: "Login", msg: "Wrong credentials." });
                }

                req.session.user = user; // Store user information in the session
                req.session.isLoggedIn = true;
                req.session.startTime = Date.now(); // Set the session start time
                console.log(`Login: StartTime set to ${req.session.startTime}`);

                if (user.userType === 'admin') {
                                // TODO: Add Logger
                    return res.redirect('/admin_home'); // Redirect admin users to the admin page
                } else if (user.userType === 'student') {
                    const sql = `
                        SELECT *
                        FROM posts p 
                        JOIN users u 
                        ON u.id = p.posterId 
                    `;
                    db.query(sql, (err, results) => {
                        if (err) return next(err);
                                    // TODO: Add Logger
                        res.render("home", {
                            title: "Home",
                            session: req.session,
                            posts: results
                        });
                    });
                } else {
                                // TODO: Add Logger
                    return res.status(403).send("Forbidden"); // Handle unexpected user types
                }
            });
        } catch (err) {
            next(err);
        }
    }],

    getRegister: (req, res) => {
        try {
            res.render("register", { title: "Register", msg: "" });
        } catch (err) {
            next(err);
        }
    },

    postRegister: async(req, res) => {
        try {
            const { firstName, lastName, email, password1, phone, birthday, idnumber } = req.body;
            const profilePicture = req.files.profilePicture;

            User.checkForDuplicates(email, phone, idnumber, async(err, user) => {
                if (err) return next(err);

                if (user.length === 0) {
                    try {
                        const saltRounds = 10;
                        const hash = await bcrypt.hash(password1, saltRounds);

                        const userData = {
                            firstName,
                            lastName,
                            email,
                            password: hash,
                            phoneNum: phone,
                            picPath: "/",
                            userType: "student", // temporary, set default value
                            birthday,
                            idnumber,
                        };

                        User.create(userData, (err, results) => {
                            if (err) return next(err);

                            User.getIdByEmail(email, (err, uid) => {
                                if (err) return next(err);

                                            // TODO: Add Logger

                                const extension = profilePicture.name.split(".").pop().toUpperCase();
                                const imgPath = "images/" + uid + "_dp." + extension;

                                User.updatePicPath(uid, imgPath, (err, results) => {
                                    if (err) return next(err);

                                    profilePicture.mv(
                                        path.resolve("public/images/", uid + "_dp." + extension),
                                        function(err) {
                                            if (err) return next(err);
                                            res.redirect("/");
                                        }
                                    );
                                });
                            });
                        });
                    } catch (err) {
                        next(err);
                    }
                } else {
                                // TODO: Add Logger
                    res.render("register", {
                        title: "Register",
                        msg: "Invalid Credentials",
                    });
                }
            });
        } catch (err) {
            next(err);
        }
    },
};

module.exports = authController;