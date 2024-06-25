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
};

module.exports = adminhomeController;