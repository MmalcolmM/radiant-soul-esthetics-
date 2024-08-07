const { User, Service } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to sign a token
const signToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
};

const resolvers = {
  Query: {
    user: async (_, __, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      return await User.findById(context.user.id);
    },
    getServices: async () => {
      return await Service.find();
    },
    getService: async (_, { id }) => {
      return await Service.findById(id);
    },
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      const token = signToken(user);
      return token;
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new AuthenticationError('Invalid credentials');
      }
      const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return token;
    },
    
    
    sendEmail: async (_, { name, email, message }) => {
      const msg = {
        to: 'mac.mac5@yahoo.com', // Your email address   info@rsesthetics.com
        from: 'em4346@rsesthetics.com', // Your verified sender email
        replyTo: email, // User's email address
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
      };
      await sgMail.send(msg);
      return 'Email sent successfully!';
    },
    addService: async (_, { title, description, price }) => {
      if (!context.user || !context.user.isAdmin) {
        throw new AuthenticationError('Unauthorized');
      }
      const service = new Service({ title, description, price });
      console.log(service);
      const results = await service.save();
      return results;
    },
    updateService: async (_, { id, name, description, price }, context) => {
      if (!context.user || !context.user.isAdmin) {
        throw new AuthenticationError('Unauthorized');
      }
      return await Service.findByIdAndUpdate(
        id,
        { name, description, price },
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
  },
};

module.exports = resolvers;
