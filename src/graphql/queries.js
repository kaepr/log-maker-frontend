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
