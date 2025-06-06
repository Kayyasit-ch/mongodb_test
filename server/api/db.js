const mongoose = require('mongoose');;
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
    try{
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully!');
    }catch(err){
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDB;