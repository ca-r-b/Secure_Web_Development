const homeController = {
    getHome: (req, res) => {
        res.render("home", { title: "nice", session: req.session });
    },
};

module.exports = homeController;