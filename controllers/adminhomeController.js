const Post = require("../models/Post");
const User = require("../models/User");
const db = require("../db");
const {
    logSessionTimeout,
    logAdminAccessDenied,
    logAdminHomeAccess,
    logPostDeleted,
    logUserDeleted,
    logAdminAccessAttempt
} = require('../utils/logger');

const adminhomeController = {
    getAdminHome: (req, res, next) => {
        try {
            if (req.session.isLoggedIn) {
                if (req.session.user.userType === "admin") {
                    logAdminHomeAccess(req.session.user.id);

                    User.getUsers((err, results) => {
                        if (err) {
                            logAdminAccessAttempt(req.session.user.id, err);
                            return next(err);
                        }
                        res.render("admin_home", { title: "Admin Home", session: req.session, users: results });
                    });
                } else {
                    logAdminAccessDenied(req.session.user.id);
                    res.redirect("/logout");
                }
            } else {
                logSessionTimeout(req.session.user ? req.session.user.id : 'unknown', 'Session timeout or user not logged in');
                res.redirect("/");
            }
        } catch (e) {
            next(e);
        }
    },

    deletePost: (req, res, next) => {
        try {
            console.log('Session data from delete post:', req.session);

            if (req.session.isLoggedIn) {
                if (req.session.user.userType === "admin") {
                    const postID = req.params.postID;

                    Post.deletePost(postID, (err, results) => {
                        if (err) {
                            logPostDeletionError(req.session.user.id, err);
                            return next(err);
                        }
                        logPostDeleted(req.session.user.id, postID);
                        res.redirect('/home');
                    });

                } else {
                    logAdminAccessDenied(req.session.user.id);
                    res.redirect("/logout");
                }
            } else {
                logSessionTimeout(req.session.user ? req.session.user.id : 'unknown', 'Session timeout or user not logged in');
                res.redirect("/");
            }
        } catch (e) {
            next(e);
        }
    },

    deleteUser: (req, res, next) => {
        try {
            console.log('Session data from delete user:', req.session);

            if (req.session.isLoggedIn) {
                if (req.session.user.userType === "admin") {
                    const userID = req.params.userID;

                    User.deleteUser(userID, (err, results) => {
                        if (err) {
                            logUserDeletionError(req.session.user.id, err);
                            return next(err);
                        }
                        logUserDeleted(req.session.user.id, userID);
                        res.redirect('/admin_home');
                    });

                } else {
                    logAdminAccessDenied(req.session.user.id);
                    res.redirect("/logout");
                }
            } else {
                logSessionTimeout(req.session.user ? req.session.user.id : 'unknown', 'Session timeout or user not logged in');
                res.redirect("/");
            }
        } catch (e) {
            next(e);
        }
    },
};

module.exports = adminhomeController;