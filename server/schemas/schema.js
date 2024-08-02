const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Service {
id: ID
name: String!
description: String!
price: Float!
}

type Query {
getServices: [Service]
getServic(id: ID): Service 
}

 type Mutation {
    addService(name: String!,
     description: String!,
      price: Float!): Service
    updateService(id: ID!, 
    name: String, 
    description: String, 
    price: Float): Service
    deleteService(id: ID!): String
  }

`;

module.exports = typeDefs