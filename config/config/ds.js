const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/meditrack';
    await mongoose.connect(uri, {
      // options are optional in latest mongoose versions
    });
    console.log('MongoDB connected ✅');
  } catch (err) {
    console.error('MongoDB connection failed ❌', err);
    process.exit(1);
  }
};

module.exports = connectDB;
