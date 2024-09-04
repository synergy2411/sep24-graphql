import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";

// Scalar types - ID, String, Boolean, Int, Float

const users = [
  { id: "u001", name: "Monica Geller", age: 23 },
  { id: "u002", name: "Rachel Greens", age: 22 },
  { id: "u003", name: "Chandler Bing", age: 24 },
];

const posts = [
  { id: "p001", title: "GraphQL 101", body: "Awesome book", published: false },
  { id: "p002", title: "React Refresh", body: "Nice blog", published: true },
  {
    id: "p003",
    title: "Advanced Angular",
    body: "Love it ❤️❤️",
    published: false,
  },
  { id: "p004", title: "Beginning NodeJS", body: "Not bad", published: true },
];

const typeDefs = /* GraphQL */ `
  type Query {
    hello: String!
    friends: [String!]!
    me: User!
    users(term: String, maxAge: Int): [User!]!
    posts(term: String): [Post!]!
  }
  type User {
    id: ID!
    name: String!
    age: Int!
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "World!!";
    },
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
    friends: () => {
      return ["Monica", "Ross", "Rachel", "Joey"];
    },
    me: () => {
      return { id: 101, name: "Monica Geller", age: 23 };
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
