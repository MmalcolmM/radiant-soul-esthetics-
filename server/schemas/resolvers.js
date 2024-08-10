const { User, Service, Order } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_TEST_KEY);
// import { toUnicode, toAscii } from 'idna-uts46-hx';

// const domain = 'xn--fsq';
// console.log(toUnicode(domain)); // converts to Unicode
// console.log(toAscii('foo.com')); // converts to ASCII


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to sign a token
const signToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '4h' }
  );
};

const resolvers = {
  Query: {
    user: async (_, __, context) => {
      if (context.user) {
        const user = await User.findById(context.user.id);

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('You must be logged in');
    },
    getServices: async () => {
      return await Service.find();
    },
    getService: async (_, { _id }) => {
      return await Service.findById(_id);
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);

        return user.orders.id(_id);
      }

      throw new AuthenticationError('You must be logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ services: args.services });
      const line_items = [];

      const { services } = await order.populate('services');

      for (let i = 0; i < services.length; i++) {
        const service = services[i];
        line_items.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: service.title,
              description: service.description,
            },
            unit_amount: service.price * 100,
          },
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    }
  },
  Mutation: {
    signup: async (_, { name, email, password }) => {
      console.log('Signup mutation called');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Password:', password);
    
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new AuthenticationError('User already exists');
      }
    
      try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        console.log('User saved successfully');
      } catch (error) {
        console.error('Error saving user:', error.message);
        throw new Error('Error saving user');
      }
    
      const token = signToken(newUser);
      return token;
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found for email:', email); // Add this line
        throw new AuthenticationError('Invalid credentials');
      }
      
      console.log('User found:', user); // Add this line
      const isValid = await bcrypt.compare(password, user.password);
      
      console.log('Password isValid:', isValid); // Add this line
      if (!isValid) {
        console.log('Invalid credentials for email:', email); // Add this line
        throw new AuthenticationError('Invalid credentials');
      }
      
      const token = signToken(user);
      return token;
    },
    sendEmail: async (_, { name, email, message }) => {
      const msg = {
        to: 'mac.mac5@yahoo.com', // Your email address
        from: 'em4346@rsesthetics.com', // Your verified sender email
        replyTo: email, // User's email address
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
      };
      await sgMail.send(msg);
      return 'Email sent successfully!';
    },
    addService: async (_, { title, description, price }, context) => {
      if (!context.user || !context.user.isAdmin) {
        throw new AuthenticationError('Unauthorized');
      }
      const service = new Service({ title, description, price });
      const results = await service.save();
      return results;
    },
    updateService: async (_, { id, title, description, price }, context) => {
      if (!context.user || !context.user.isAdmin) {
        throw new AuthenticationError('Unauthorized');
      }
      return await Service.findByIdAndUpdate(
        id,
        { title, description, price },
        { new: true }
      );
    },
    deleteService: async (_, { id }, context) => {
      if (!context.user || !context.user.isAdmin) {
        throw new AuthenticationError('Unauthorized');
      }
      await Service.findByIdAndDelete(id);
      return 'Service deleted';
    },
    addOrder: async (parent, { services }, context) => {
      if (context.user) {
        const order = new Order({ services });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('You must be logged in');
    },
  },
};

module.exports = resolvers;
