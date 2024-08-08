const db = require('./connection');
const {User, Service } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Service', 'services');
  await cleanDB('User', 'users');

  const services = await Service.insertMany([
   {
    name: 'Deep Cleansing Bacial (Back Facial)',
    description:
      'This specialized service begins with a thorough cleansing to remove impurities, excess oil, and buildup from the skin&apos;s surface.',
    price: 140
  },
  {
    name: 'Teen Acne Facial',
    description:
      'A specialized treatment designed to target and alleviate teenage skin concerns with care and expertise.',
    price: 80
  },
  {
    name: 'Anti-Aging Facial',
    description:
      'Indulge in our rejuvenating anti-aging facial, meticulously crafted to breathe new life into your skin while addressing signs of aging.',
    price: 115
  },
  ]);

  console.log('services seeded');

  await User.create({
    firstName: 'test1',
    lastName: 'test1',
    email: 'test1@testmail.com',
    password: 'password1',
    orders: [
      {
        services: [services[0]._id, services[0]._id, services[1]._id]
      }
    ]
  });
});
