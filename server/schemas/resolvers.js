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