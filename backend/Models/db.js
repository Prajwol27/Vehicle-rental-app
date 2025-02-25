const mongoose = require('mongoose');
require("dotenv").config();

const mongo_url = process.env.URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongo_url, );
        console.log(` MongoDB Connected... to: ${mongo_url}`);
    } catch (err) {
        console.error(" MongoDB Connection Error:", err);
    }
};

module.exports = connectDB;
