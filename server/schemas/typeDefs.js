const typeDefs =`
  type User{
  _id: ID
  name: String
  email: String
  }

  type Query {
    user: User
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): String
    login(username: String!, password: String!): String
    sendEmail(name: String!, email: String!, message: String!): String
  }
`;

module.exports =typeDefs;