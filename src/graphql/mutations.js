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
