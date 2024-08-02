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
const { typeDefs, resolvers } = require('./schemas');
const db =require('./config/connection');


// Initialize Express
const app = express();
const PORT = process.env.PORT || 3073;

// Use CORS middleware
app.use(cors());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Define Mongoose models
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);


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
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
}

startServer();
