import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";

// Scalar types - ID, String, Boolean, Int, Float

const users = [
  { id: "u001", name: "Monica Geller", age: 23 },
  { id: "u002", name: "Rachel Greens", age: 22 },
  { id: "u003", name: "Chandler Bing", age: 24 },
];

const typeDefs = /* GraphQL */ `
  type Query {
    hello: String!
    friends: [String!]!
    me: User!
    users(term: String): [User!]!
  }
  type User {
    id: ID!
    name: String!
    age: Int!
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "World!!";
    },
    users: (parent, args, context, info) => {
      if (args.term) {
        return users.filter((user) =>
          user.name.toLowerCase().includes(args.term.toLowerCase())
        );
      }
      return users;
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
