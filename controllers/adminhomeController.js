const adminhomeController = {
    getAdminHome: (req, res) => {
        res.render("admin_home", { title: "ADMIN HOME YEEER", session: req.session });
    },
};

module.exports = adminhomeController;