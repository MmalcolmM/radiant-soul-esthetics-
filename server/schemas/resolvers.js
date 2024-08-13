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
    users: async () => {
      return await User.find();
    },
    user: async (_, __, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .populate({
            path: 'orders',
            populate: {
              path: 'services', // Populate services within orders
            },
          });
    
        if (!user) {
          throw new AuthenticationError('User not found');
        }
    
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
    user: async (parent, { _id }, context) => {
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
    },
  },
  Mutation: {
    signup: async (_, { name, email, password }) => {
      try {
        console.log('Signup mutation called');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new AuthenticationError('User already exists');
        }

        const newUser = new User({ name, email, password });
        await newUser.save();
        console.log('User saved successfully');
        const token = signToken(newUser);
        return token;
      } catch (error) {

        console.error('Error saving user:', error.message);
        throw new Error('Error saving user');
        return
      }


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
      try {
        // Email to yourself (your inbox)
        const msgToSelf = {
          to: 'malcolm.franklin.m@gmail.com',
          from: 'em4346@rsesthetics.com',
          replyTo: email,
          subject: 'New Contact Form Submission',
          text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
          html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
        };
        await sgMail.send(msgToSelf);

        // Automatic reply to the user
        const autoReplyMsg = {
          to: email,
          from: 'em4346@rsesthetics.com',
          subject: 'Thank You for Contacting Radiant Soul Esthetics',
          text: `Hello ${name},\n\nThank you for reaching out to Radiant Soul Esthetics! Your inquiry is important to us.\n\nPlease note that I am currently away from my email, attending to clients. I will do my best to respond to your message within 24-48 hours.\n\nFor urgent inquiries, feel free to call or text me directly at 303-550-9603 or to schedule an appointment, please visit rsethetics.com.\n\nThank you for your patience and understanding.\n\nLove and Light,\n\nDeidre Hallert\nPMU Artist and Esthetician\nRadiant Soul Esthetics\n\n303-550-9603\ninfo@rsesthetics.com`,
          html: `<p>Hello ${name},</p><p>Thank you for reaching out to Radiant Soul Esthetics! We have received your message and will get back to you as soon as possible.</p><p>Best regards,<br>Radiant Soul Esthetics Team</p>`,
        };

        const response = await sgMail.send(autoReplyMsg);
        console.log('SendGrid Response:', response);

        return 'Email sent successfully!';
      } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email. Please try again later.');
      }
    },

    addService: async (parent, { title, description, price }, context) => {

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

      return await Service.findOneAndDelete({ _id: id });
    },
    addOrder: async (parent, { services }, context) => {
      if (context.user) {
        const order = new Order({ services });
        await order.save(); // Explicitly save the order
        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order._id } }); // Save only the order ID to the user
        return order;
      }
      throw new AuthenticationError('You must be logged in');
    },
  },
};

module.exports = resolvers;
