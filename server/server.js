require('dotenv').config();
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3001;

// Use CORS middleware
app.use(cors());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Mongoose models
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Define GraphQL type definitions
const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    signup(username: String!, password: String!): String
    login(username: String!, password: String!): String
    sendEmail(name: String!, email: String!, message: String!): String
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
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

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    let user = null;
    if (token) {
      try {
        user = jwt.verify(token, process.env.JWT_SECRET);
      } catch (e) {
        console.error(e);
      }
    }
    return { user };
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, 'client/dist')));

  // The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
}

startServer();
