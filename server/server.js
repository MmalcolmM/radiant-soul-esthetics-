require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');
const path = require('path');
const typeDefs = require('./schemas/typeDefs'); // Ensure you import typeDefs correctly
const resolvers = require('./schemas/resolvers'); // Ensure you import resolvers correctly
const db = require('./config/connection');



// Initialize Express
const app = express();
const PORT = process.env.PORT || 3071;

// Use CORS middleware
app.use(cors());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

<<<<<<< HEAD
=======
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
>>>>>>> 24038e18061459b9a82e267f1322f3104dc026ff

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    let user = null;
    if (token) {
      try {
        user = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
      } catch (e) {
        console.error('JWT verification error:', e);
      }
    }
    return { user };
  },
});


async function startServer() {
  await server.start();

  server.applyMiddleware({ app });
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // Includes middleware for GraphQL
  app.use('/graphql', server.getMiddleware({ path: '/graphql' }));

  // The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });

  // Start the server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port http://localhost:${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
}

startServer();
