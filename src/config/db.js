const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

async function connectDB() {
    try {
        await mongoose.connect(uri);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(`Database connection error: ${error.message}`);
        process.exit(1)
    }
};
 

module.exports = connectDB;