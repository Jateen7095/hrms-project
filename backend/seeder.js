const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hrms');

const importData = async () => {
  try {

    await User.deleteMany();

    const users = [
      {
        name: 'Admin User',
        email: 'admin@hrms.com',
        password: await bcrypt.hash('password123', 10),
        role: 'Admin',
        designation: 'System Administrator',
        salary: 100000
      },
      {
        name: 'HR Manager',
        email: 'hr@hrms.com',
        password: await bcrypt.hash('password123', 10),
        role: 'HR',
        designation: 'HR Manager',
        salary: 80000
      },
      {
        name: 'John Doe',
        email: 'employee@hrms.com',
        password: await bcrypt.hash('password123', 10),
        role: 'Employee',
        designation: 'Software Engineer',
        salary: 60000
      }
    ];

    await User.insertMany(users);

    console.log('Data Imported...');
    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();