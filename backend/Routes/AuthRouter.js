const express = require("express");
const { signup, login } = require("../Controllers/AuthController");
const { signupValidation, loginValidation } = require("../Middlewares/AuthValidation");
const { ensureAuthenticated } = require("../Middlewares/Auth"); 

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.get("/admin", ensureAuthenticated, (req, res) => {
    res.status(200).json({ message: "Welcome Admin" });
});

module.exports = router;
