const bcrypt = require('bcryptjs');
const User = require('../models/User');
const path = require('path');
const db = require('../db');

const userController = {
    
    getLogin: (req, res) => {
        res.render("login", { title: "Login", msg: "" });
    },

    postLogin: (req, res) => {
        User.findByEmail(req.body.email, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Database error");
            }
            if (!user || !bcrypt.compareSync(req.body.pass, user.password)) {
                return res.render("login", { title: "Login", msg: "Wrong credentials."});
            }
            res.send("Welcome to the page!", { user: user});
        });
    },

    getRegister: (req, res) => {
        res.render("register", { title: "Register", msg: "" });
    },

    
    postRegister: async (req, res) => {
        try {
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const email = req.body.email;
            const password1 = req.body.password1;
            const phone = req.body.phone;
            const profilePicture = req.files.profilePicture;
            
            const saltRounds = 10;
            const hash = await bcrypt.hash(password1, saltRounds);

            var extension = profilePicture.name.split('.').pop().toUpperCase(); 

            const nextId = await User.getHighestIdPlusOne();

            console.log("new user id:" + nextId );

            profilePicture.mv(path.resolve('public/images/',nextId+"_dp."+extension),function(err) {
                if(err){
                    console.log(err);
                }else{
                    console.log("Successful profile image upload!");
                }
            });
            const imgPath = '/images/dp/'+nextId+"_dp"+"."+extension;

            console.log("INFO");
            console.log(firstName);
            console.log(lastName);
            console.log(email);
            console.log(password1);
            console.log(phone);

            const userData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash,
                phoneNum: phone,
                picPath: imgPath, 
                userType: "student" // temporary, set default value
            };

            console.log(userData);

            User.create(userData, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Database error");
                }
                res.redirect('/');
            });
        } catch (err) {
            console.log(err);
            res.status(500).send("Server error");
        }
    },
};

module.exports = userController;