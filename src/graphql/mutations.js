import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      id
      fullname
      email
      role
      createdAt
      token
    }
  }
`;

export const CREATE_LOG = gql`
  mutation CREATE_LOG($body: String!, $phoneNumber: String!) {
    createLog(input: { body: $body, phoneNumber: $phoneNumber }) {
      id
      body
      phoneNumber
      user
      createdAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UPDATE_USER(
    $id: ID!
    $fullname: String!
    $role: String!
    $email: String!
    $password: String!
  ) {
    updateUser(
      input: {
        id: $id
        fullname: $fullname
        role: $role
        password: $password
        email: $email
      }
    ) {
      id
      fullname
      role
      createdAt
      email
    }
  }
`;

export const CREATE_USER = gql`
  mutation CREATE_USER(
    $fullname: String!
    $password: String!
    $confirmpassword: String!
    $role: String!
    $email: String!
  ) {
    register(
      input: {
        fullname: $fullname
        password: $password
        confirmpassword: $confirmpassword
        email: $email
        role: $role
      }
    ) {
      id
      fullname
      email
      role
      createdAt
    }
  }
`;
