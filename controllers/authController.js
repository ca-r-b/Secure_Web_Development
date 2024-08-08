const bcrypt = require("bcryptjs");
const User = require("../models/User");
const path = require("path");
const loginLimiter = require("../middleware/loginLimiter");
const db = require("../db");
const {
    logLoginSuccess,
    logLoginFailed,
    logAccountCreated,
    logAccountEdited,
    logProfilePictureUpload,
    logProfilePictureUploadError
} = require('../utils/logger');

const authController = {
    getLogin: (req, res, next) => {
        try {
            if (!req.session.isLoggedIn) {
                res.render("login", { title: "Login", msg: "" });
            } else {
                if (req.session.user.userType === "admin") {
                    res.redirect("/admin_home");
                } else {
                    res.redirect("/home");
                }
            }
        } catch (err) {
            next(err);
        }
    },

    postLogin: [loginLimiter, (req, res, next) => {
        try {
            User.findByEmail(req.body.email, (err, user) => {
                if (err) {
                    logLoginFailed(req.body.email); // Log failed login attempt due to database error
                    return next(err);
                }
                if (!user || !bcrypt.compareSync(req.body.pass, user.password)) {
                    logLoginFailed(req.body.email);
                    return res.render("login", { title: "Login", msg: "Wrong credentials." });
                }

                req.session.user = user;
                req.session.isLoggedIn = true;
                req.session.startTime = Date.now();
                logLoginSuccess(user.id); // Log successful login

                if (user.userType === 'admin') {
                    return res.redirect('/admin_home'); // Redirect admin users to the admin page
                } else if (user.userType === 'student') {
                    const sql = `
                        SELECT *
                        FROM posts p 
                        JOIN users u 
                        ON u.id = p.posterId 
                    `;
                    db.query(sql, (err, results) => {
                        if (err) {
                            logLoginFailed(req.body.email);
                            return next(err);
                        }
                        res.render("home", {
                            title: "Home",
                            session: req.session,
                            posts: results
                        });
                    });
                } else {
                    logLoginFailed(req.body.email);
                    return res.status(403).send("Forbidden");
                }
            });
        } catch (err) {
            next(err);
        }
    }],

    getRegister: (req, res, next) => {
        try {
            res.render("register", { title: "Register", msg: "" });
        } catch (err) {
            next(err);
        }
    },

    postRegister: async(req, res, next) => {
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

                                logAccountCreated(uid);

                                const extension = profilePicture.name.split(".").pop().toUpperCase();
                                const imgPath = "images/" + uid + "_dp." + extension;

                                User.updatePicPath(uid, imgPath, (err, results) => {
                                    if (err) {
                                        logProfilePictureUploadError(uid, err);
                                        return next(err);
                                    }

                                    profilePicture.mv(
                                        path.resolve("public/images/", uid + "_dp." + extension),
                                        function(err) {
                                            if (err) {
                                                logProfilePictureUploadError(uid, err);
                                                return next(err);
                                            }
                                            logProfilePictureUpload(uid, imgPath);
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
                    logAccountEdited(email);
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