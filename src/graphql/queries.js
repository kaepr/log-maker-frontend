import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query GET_CURRENT_USER {
    getCurrentUser {
      id
      fullname
      email
      role
    }
  }
`;

export const GET_CURRENT_USER_LOG = gql`
  query GET_CURRENT_USER_LOG {
    getCurrentUserLogs {
      id
      body
      phoneNumber
      user
      createdAt
    }
  }
`;

export const GET_USERS = gql`
  query GET_USERS($offset: Int, $limit: Int) {
    getUsers(input: { offset: $offset, limit: $limit }) {
      id
      fullname
      role
      createdAt
      email
    }
  }
`;
