const Post = require("../models/Post");

const homeController = {
    getHome: (req, res) => {
        try{
            if(req.session.isLoggedIn){
                if(req.session.user.userType === "student") {
                    res.render("home", { title: "Home", session: req.session });
                } else{
                    res.redirect("/logout");
                }
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
            // CREATE TABLE `secwbdb`.`posts` (
            //     `id` INT NOT NULL,
            //     `posterId` VARCHAR(36) NOT NULL,
            //     `content` VARCHAR(250) NOT NULL,
            //     PRIMARY KEY (`id`));

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
                    console.log('Posted successfully');
                    res.render("home", { title: "Home", session: req.session });
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