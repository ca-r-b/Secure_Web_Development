const Post = require("../models/Post");
const {
    logPostSubmitted,
    logPostSubmissionError,
    logLoginSuccess,
    logSessionTimeout
} = require('../utils/logger');

const homeController = {
    getHome: (req, res) => {
        try {
            console.log('Session data:', req.session);
            if (req.session.isLoggedIn) {
                logLoginSuccess(req.session.user.id);
                Post.getPosts((err, results) => {
                    if (err) return next(err);
                    res.render("home", {
                        title: "Home",
                        session: req.session,
                        posts: results
                    });
                });
            } else {
                res.redirect("/");
            }
        } catch (e) {
            next(e);
        }
    },

    postHome: (req, res) => {
        try {
            const { postInput } = req.body;
            const posterId = req.session.user.id;

            const postData = {
                posterId: posterId,
                content: postInput
            };

            Post.create(postData, (err, result) => {
                if (err) {
                    logPostSubmissionError(posterId, err.message);
                    return next(err);
                }
                logPostSubmitted(posterId, result.insertId);
                Post.getPosts((err, results) => {
                    if (err) return next(err);
                    res.render("home", {
                        title: "Home",
                        session: req.session,
                        posts: results
                    });
                });
            });
        } catch (e) {
            next(e);
        }
    },

    getLogout: (req, res) => {
        const userId = req.session.user ? req.session.user.id : 'unknown';
        logSessionTimeout(userId, 'User initiated logout');
        req.session.isLoggedIn = false;
        req.session.destroy((err) => {
            if (err) return next(err);
            res.clearCookie('session_cookie_name');
            res.redirect("/");
        });
    }
};

module.exports = homeController;