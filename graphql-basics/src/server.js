import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";
import { GraphQLError } from "graphql";
import { v4 } from "uuid";

// Scalar types - ID, String, Boolean, Int, Float

const users = [
  { id: "u001", name: "Monica Geller", age: 23 },
  { id: "u002", name: "Rachel Greens", age: 22 },
  { id: "u003", name: "Chandler Bing", age: 24 },
];

const posts = [
  {
    id: "p001",
    title: "GraphQL 101",
    body: "Awesome book",
    published: false,
    author: "u003",
  },
  {
    id: "p002",
    title: "React Refresh",
    body: "Nice blog",
    published: true,
    author: "u002",
  },
  {
    id: "p003",
    title: "Advanced Angular",
    body: "Love it ❤️❤️",
    published: false,
    author: "u001",
  },
  {
    id: "p004",
    title: "Beginning NodeJS",
    body: "Not bad",
    published: true,
    author: "u003",
  },
];

const comments = [
  { id: "c001", text: "Love it", post: "p004", creator: "u001" },
  { id: "c002", text: "Like it", post: "p003", creator: "u002" },
  { id: "c003", text: "Awesome", post: "p004", creator: "u001" },
  { id: "c004", text: "Not that great", post: "p001", creator: "u002" },
];

const typeDefs = /* GraphQL */ `
  type Mutation {
    createUser(data: CreateUserInput): User!
    createPost(authorId: ID!, data: CreatePostInput): Post!
    createComment(creatorId: ID!, postId: ID!, text: String!): Comment!
  }

  type Query {
    users(term: String, maxAge: Int): [User!]!
    posts(term: String): [Post!]!
    comments: [Comment!]!
  }
  type User {
    id: ID!
    name: String!
    age: Int!
    posts: [Post!]!
    comments: [Comment!]!
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean
    author: User!
    comments: [Comment!]!
  }
  type Comment {
    id: ID!
    text: String!
    post: Post
    creator: User!
  }
  input CreateUserInput {
    name: String!
    age: Int!
  }
  input CreatePostInput {
    title: String!
    body: String!
  }
`;

const resolvers = {
  Mutation: {
    createUser: (parent, args, context, info) => {
      const { name, age } = args.data;
      const newUser = {
        id: v4(),
        name,
        age,
      };
      users.push(newUser);
      return newUser;
    },
    createPost: (parent, args, context, info) => {
      const { title, body } = args.data;
      const position = users.findIndex((user) => user.id === args.authorId);
      if (position === -1) {
        throw new GraphQLError(
          "Unable to find author for id - " + args.authorId
        );
      }
      const newPost = {
        id: v4(),
        title,
        body,
        published: false,
        author: args.authorId,
      };
      posts.push(newPost);
      return newPost;
    },
  },
  Query: {
    users: (parent, args, context, info) => {
      let resultUsers = users;
      if (args.term) {
        resultUsers = users.filter((user) =>
          user.name.toLowerCase().includes(args.term.toLowerCase())
        );
      }
      if (args.maxAge) {
        resultUsers = resultUsers.filter((user) => user.age <= args.maxAge);
      }
      return resultUsers;
    },
    posts: (parent, args, context, info) => {
      if (args.term) {
        return posts.filter(
          (post) =>
            post.title.toLowerCase().includes(args.term.toLowerCase()) ||
            post.body.toLowerCase().includes(args.term.toLowerCase())
        );
      }
      return posts;
    },
    comments: (parent, args, context, info) => {
      return comments;
    },
  },
  User: {
    posts: (parent, args, context, info) => {
      return posts.filter((post) => post.author === parent.id);
    },
    comments: (parent, args, context, info) => {
      return comments.filter((comment) => comment.creator === parent.id);
    },
  },
  Post: {
    author: (parent, args, context, info) => {
      return users.find((user) => user.id === parent.author);
    },
    comments: (parent, args, context, info) => {
      return comments.filter((comment) => comment.post === parent.id);
    },
  },
  Comment: {
    post: (parent, args, context, info) => {
      return posts.find((post) => post.id === parent.post);
    },
    creator: (parent, args, context, info) => {
      return users.find((user) => user.id === parent.creator);
    },
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({ schema });

const server = createServer(yoga);

server.listen("4040", () =>
  console.log("GraphQL Server started 🚀 on port : 4040")
);
