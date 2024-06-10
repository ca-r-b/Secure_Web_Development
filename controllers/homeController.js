const bcrypt = require('bcryptjs');
const User = require('../models/User');
const path = require('path');
const db = require('../db');

const homeController = {
    getHome: (req, res) => {
        res.render("home", { title: "nice"});
    },
};

module.exports = homeController;