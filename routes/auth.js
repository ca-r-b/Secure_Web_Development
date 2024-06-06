const express = require("express");
const router = express.Router();

const userController = require("../controllers/usersController");

// Login routes
router.get("/", userController.getLogin);
router.post("/loginProcess", userController.postLogin);

module.exports = router;