const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");

// Auth routes
router.get("/", authController.getLogin);
router.post('/', authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);


// Auth routes
router.get("/home", homeController.getHome);

module.exports = router;