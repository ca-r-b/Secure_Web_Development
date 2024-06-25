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