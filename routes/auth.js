const express = require("express");
const router = express.Router();

const userController = require("../controllers/usersController");

// Login routes
router.get("/", userController.getLogin);


router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);

router.get('/register', userController.getRegister);
router.post('/register', userController.postRegister);

module.exports = router;