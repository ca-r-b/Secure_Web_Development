const Post = require("../models/Post");
const User = require("../models/User");
const db = require("../db");

const adminhomeController = {
    getAdminHome: (req, res) => {
        try {
            if (req.session.isLoggedIn) {
                if (req.session.user.userType === "admin") {

                    User.getUsers((err, results) => {
                        if (err) return next(err); 
                        res.render("admin_home", { title: "Admin Home", session: req.session, users: results });
                        
                    });
                } else {
                    res.redirect("/logout");
                }
            } else {
                res.redirect("/");
            }
        } catch (e) {
            next(err);
        }
    },

    deletePost: function(req, res) {
        try {
            console.log('Session data from delete post:', req.session);
            // hjopw do i ensure that it is indeed getting req.session
            if (req.session.isLoggedIn) {
                if (req.session.user.userType === "admin") {

                    const postID = req.params.postID;

                    Post.deletePost(postID, (err, results) => {
                        if (err) return next(err);
                        res.redirect('/home');
                    });


                } else {
                    res.redirect("/logout");
                }
            } else {
                res.redirect("/");
            }
        } catch (e) {
            next(err);
        }
    },


    deleteUser: function(req, res) {
        try {
            console.log('Session data from delete user:', req.session);
            // hjopw do i ensure that it is indeed getting req.session
            if (req.session.isLoggedIn) {
                if (req.session.user.userType === "admin") {

                    const userID = req.params.userID;

                    User.deleteUser(userID, (err, results) => {
                        if (err) return next(err);
                        res.redirect('/admin_home');
                    });


                } else {
                    res.redirect("/logout");
                }
            } else {
                res.redirect("/");
            }
        } catch (e) {
            next(err);
        }
    },
};

module.exports = adminhomeController;