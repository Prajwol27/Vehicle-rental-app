const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");

const signup = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists!", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword, isAdmin });

        await newUser.save();
        res.status(201).json({ message: "Signup successful", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error!", success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Invalid email or password", success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(401).json({ message: "Invalid email or password", success: false });
        }

        const token = jwt.sign(
            { _id: user._id, email: user.email, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );
        console.log("Generated Token:", token); 

        res.status(200).json({ message: "Login successful", success: true, token, isAdmin: user.isAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error!", success: false });
    }
};



module.exports = { signup, login };
