const db = require('../config/connection');
const cleanDB = require('./cleanDB');
const { Service} =require('../models')
const serviceData=require('./serviceData.json')

db.once('open',async () => {
    await cleanDB('Service','services');
    await Service.insertMany(serviceData);
    console.log('seeding complete');
    process.exit(0);
});