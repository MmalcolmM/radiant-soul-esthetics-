const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String!
    email: String!
  }

  type Service {
    id: ID
    name: String!
    description: String!
    price: Float!
  }

  type Query {
    user: User
    getServices: [Service]
    getService(id: ID!): Service
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): String
    login(email: String!, password: String!): String
    sendEmail(name: String!, email: String!, message: String!): String
    addService(name: String!, description: String!, price: Float!): Service
    updateService(id: ID!, name: String, description: String, price: Float): Service
    deleteService(id: ID!): String
  }
`;

module.exports = typeDefs;
