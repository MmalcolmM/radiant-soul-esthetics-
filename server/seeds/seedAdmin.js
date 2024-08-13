// require('dotenv').config();
// const mongoose = require('mongoose');
// const User = require('./models/User');
// const db= require('./config/connection');


// db.once('open' ,async () => {
//   console.log('Connected to MongoDB');

//   const adminUser = new User({
//     name: 'Deidre Admin',
//     email: 'info@rsesthetics.com',
//     password: 'LowandSlow$1988', // Replace with a strong password
//     isAdmin: true
//   });

//   const testUser = new User({
//     name: 'test test',
//     email: 'test@testemail.com',
//     password: 'testtest',

//     isAdmin: false
//   });

//   try {
//     await adminUser.save();
//     await testUser.save();
//     console.log('Admin user created successfully');
//   } catch (error) {
//     console.error('Error creating admin user:', error.message);
//   } finally {
//     mongoose.connection.close();
//   }
// });

require('dotenv').config();
const mongoose = require('mongoose');
const {User, Service, Order} = require('../models')
const cleanDB = require('./cleanDB');
const db = require('../config/connection');

db.once('open', async () => {
  // Clean existing data
  await cleanDB('User', 'users');
  await cleanDB('Order', 'orders');
  console.log('Connected to MongoDB and cleaned User and Order collections');

  // Check if services already exist in the database
  let services = await Service.find();

  if (!services.length) {
    console.error('No services found. Please ensure the services are seeded.');
    return process.exit(1);
  }

  console.log('Found existing services:', services.map(s => s.title));

  // Create an order using the existing services
  const order1 = new Order({
    services: services.map(service => service._id),  // Link services to the order by their IDs
    purchaseDate: Date.now(),
  });

  await order1.save();
  console.log('Order created:', order1);

  // Create users and associate orders with them
  const adminUser = new User({
    name: 'Deidre Admin',
    email: 'info@rsesthetics.com',
    password: 'LowandSlow$1988', // Replace with a strong password
    isAdmin: true,
  });

  const testUser = new User({
    name: 'Jane Doe',
    email: 'test1@testemail.com',
    password: 'testtest',
    isAdmin: false,
    orders: [order1._id],  // Link the order to the user
  });

  try {
    await adminUser.save();
    await testUser.save();
    console.log('Users and order created successfully');
  } catch (error) {
    console.error('Error creating users or orders:', error.message);
  } finally {
    mongoose.connection.close();
  }
});

