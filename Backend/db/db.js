// const mongoose = require('mongoose');


// function connectToDb(){
//     mongoose.connect(process.env.DB_CONNECT ).then(() => {
//         console.log('Connected to DB');
// }).catch(err => console.log(err));
// }

// module.exports = connectToDb;

// db/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {
     
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1); // Exit app if DB connection fails
  }
};

module.exports = connectToDb;
