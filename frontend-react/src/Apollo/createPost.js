import { gql } from "@apollo/client";

const CREATE_POST = gql`
  mutation CreatePostMutation($title: String!, $body: String!) {
    createPost(data: { title: $title, body: $body }) {
      id
      title
      body
      published
    }
  }
`;

export default CREATE_POST;
