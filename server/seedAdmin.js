require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const db= require('./config/connection');


db.once('open' ,async () => {
  console.log('Connected to MongoDB');

  const adminUser = new User({
    name: 'Deidre Admin',
    email: 'info@rsesthetics.com',
    password: 'LowandSlow$1988', // Replace with a strong password
    isAdmin: true
  });

  try {
    await adminUser.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error.message);
  } finally {
    mongoose.connection.close();
  }
});
