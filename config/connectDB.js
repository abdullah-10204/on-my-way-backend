const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};



module.exports = { connectDB}