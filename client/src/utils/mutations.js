import { gql } from '@apollo/client';


export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }`
    ;

export const SIGNUP = gql`
mutation Signup($email: String!, $name: String!, $password: String!) {
  signup(email: $email, name: $name, password: $password)
}
`;

export const ADDSERVICE = gql`
mutation addService($title: String!, $description: String!, $price: Float!) {
    addService(title: $title, description: $description, price: $price)
    {    description
    title
    price
    }
    }

`;

export const REMOVESERVICE=gql`
mutation Mutation($deleteServiceId: ID!) {
  deleteService(id: $deleteServiceId) {
    _id
  }
}
`;

export const UPDATESERVICE=gql`
mutation Mutation($title: String, $description: String, $price: Float, $updateServiceId: ID!) {
  updateService(title: $title, description: $description, price: $price, id: $updateServiceId) {
    description
    price
    title
  }
}
`;