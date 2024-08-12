const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type User {
    _id: ID
    name: String!
    email: String!
    orders: [Order]
  }

  type Service {
    _id: ID
    title: String!
    description: String!
    price: Float!
  }

  type Order {
    _id: ID
    purchaseDate: String
    services: [Service]
  }

  type Checkout {
    session: ID
  }

  type Query {
    user: User
    getServices: [Service]
    getService(_id: ID!): Service
    order(_id: ID!): Order
    checkout(services: [ID]!): Checkout
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): String
    login(email: String!, password: String!): String
    sendEmail(name: String!, email: String!, message: String!): String
    addService(title: String!, description: String!, price: Float!): Service

    updateService(id: ID!, title: String, description: String, price: Float): Service
    deleteService(id: ID!): Service

    addOrder(services: [ID!]!): Order
  }
`;

module.exports = typeDefs;
