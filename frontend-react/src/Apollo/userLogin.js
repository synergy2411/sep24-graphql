import { gql } from "@apollo/client";

const USER_LOGIN = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(data: { email: $email, password: $password }) {
      token
    }
  }
`;

export default USER_LOGIN;
