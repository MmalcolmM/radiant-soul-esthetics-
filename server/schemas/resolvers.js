<<<<<<< HEAD
const { Query } = require('mongoose');
const { Service } = require('../models');
const { AuthenticationError } =  require('apollo-server-express');
const jwt = require('jsonwebtoken');


const signToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, isAdmin: user.isAdmin},
        process.env.JWT_Secret,
        {expiresIn: '1h'}
    );
};

const resolvers = {
    Query: {
        getServices: async () => {
            return await Service.find()
        },
        getService: async (_, { id }) => {
            return await Service.findById(id);
        },
    },

    Mutation: {
        addService: async (parent, { name, description, price}, context) => {
            if (!context.user || !context.user.isAdmin ) {
                throw new AuthenticationError('Unauthorized');
            }
            const service = new Service({ name, description, price });
            return await service.save()
        }
    }
}
=======
const {User} = require('../models')

const resolvers = {
    Query: {
      
    },
    Mutation: {
      signup: async (parent, { username, password }) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
      },
      login: async (parent, { username, password }) => {
        const user = await User.findOne({ username });
        if (!user) throw new Error('Invalid credentials');
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error('Invalid credentials');
        return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
      },
      sendEmail: async (parent, { name, email, message }) => {
        const msg = {
          to: 'info@rsesthetics.com', // Your email address
          from: 'em4346@rsesthetics.com', // Your verified sender email
          replyTo: email, // User's email address
          subject: 'New Contact Form Submission',
          text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
          html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
        };
  
        await sgMail.send(msg);
        return 'Email sent successfully!';
      },
    },
  };

module.exports = resolvers;
>>>>>>> 729d12bb27b436e236de5a871ff4c0c9a6cd9fba
