const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");

// Auth routes
router.get("/", authController.getLogin); // Ensure this route is defined
router.post("/", authController.postLogin); // Ensure this route is defined
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

// Home route
router.get("/home", homeController.getHome);

module.exports = router;