const Post = require("../models/Post");
const db = require("../db");

const homeController = {
    getHome: (req, res) => {
        try{
            console.log('Session data:', req.session); 
            if(req.session.isLoggedIn){
                Post.getPosts((err, results) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).send("Database error");
                        } else{
                            res.render("home", { 
                                title: "Home", 
                                session: req.session, 
                                posts: results 
                            });
                        }
                    }
                );
            } else {
                res.redirect("/");
            }
            
        } catch(e){
            console.log('Error (Student)');
            res.redirect("/logout");
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
                if (err) {
                console.log(err);
                return res.status(500).send("Database error");
                } else{
                    Post.getPosts((err, results) => {
                            if (err) {
                                console.log(err);
                                return res.status(500).send("Database error");
                            } else{
                                res.render("home", { 
                                    title: "Home", 
                                    session: req.session, 
                                    posts: results 
                                });
                            }
                        }
                    );
                }
            });
       
            
        } catch(e){
            console.log('Error POST post ' + e);
            res.redirect("/logout");
        }
    },

    getLogout: (req, res) => {
        req.session.isLoggedIn = false;
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                return res.redirect("/");
            }
            res.clearCookie('session_cookie_name');
            res.redirect("/");
        });
    }
};

module.exports = homeController;