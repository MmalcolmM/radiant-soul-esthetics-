import { gql } from '@apollo/client';




export const QUERY_SERVICES = gql`
query GetServices($getServiceId: ID!) {
  getService(id: $getServiceId) {
    description
    price
    title

  }
}
`;


export const QUERYALLSERVICES = gql`
query Query {

  getServices {
    description
    price
    title
    _id
  }
}
`;

export const GETSERVICES =gql`
query GetServices {
  getServices {
    _id
    description
    price
    title
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
      email
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
