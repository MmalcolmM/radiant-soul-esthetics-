const typeDefs =`
  type Query {
    hello: String
  }

  type Mutation {
    signup(username: String!, password: String!): String
    login(username: String!, password: String!): String
    sendEmail(name: String!, email: String!, message: String!): String
  }
`;

module.exports =typeDefs;