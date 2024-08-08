const Post = require("../models/Post");
const db = require("../db");
const winston = require('winston');

const homeController = {
    getHome: (req, res) => {
        try {
            console.log('Session data:', req.session);
            if (req.session.isLoggedIn) {
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

            Post.create(postData, (err, results) => {
                if (err) return next(err);
                Post.getPosts((err, results) => {
                    if (err) return next(err);
                    // TODO: Add Logger
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
        req.session.isLoggedIn = false;
        req.session.destroy((err) => {
            if (err) return next(err);
                        // TODO: Add Logger
            res.clearCookie('session_cookie_name');
            res.redirect("/");
        });
    }
};

module.exports = homeController;