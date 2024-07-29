const Post = require("../models/Post");
const db = require("../db");

const adminhomeController = {
    getAdminHome: (req, res) => {
        try{
            if(req.session.isLoggedIn){
                if(req.session.user.userType === "admin") {
                    res.render("admin_home", { title: "Admin Home", session: req.session });
                } else{
                    res.redirect("/logout");
                }
            } else {
                res.redirect("/");
            }
        } catch(e){
            console.log('Error (Admin)');
            res.redirect("/logout");
        }
    },
    
    deletePost: function (req, res){
        try{
            console.log('Session data from delete post:', req.session); 
            // hjopw do i ensure that it is indeed getting req.session
            if(req.session.isLoggedIn){
                if(req.session.user.userType === "admin") {
                    
                    const postID = req.params.postID;
                    console.log('NIGGA ' + postID);
                    
                    Post.deletePost(postID, (err, results) => {
                        if (err) {
                        console.log(err);
                        return res.status(500).send("Database error");
                        }
                        res.redirect('/home');
                    });

                    
                } else{
                    res.redirect("/logout");
                }
            } else {
                res.redirect("/");
            }
        } catch(e){
            console.log('Error (Admin) HERE');
            res.redirect("/logout");
        }
    },

};

module.exports = adminhomeController;