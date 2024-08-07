import { gql } from '@apollo/client';

export const QUERY_ALL_SERVICES = gql`
  {
    services {
      _id
      name
      description
      price
      }
    }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($services: [ID]!) {
    checkout(services: $services) {
      session
    }
  }
`;


export const QUERY_USER = gql`
  {
    user {
      username
      orders {
        _id
        purchaseDate
        services {
          _id
          name
          description
          price
        }
      }
    }
  }
`;
