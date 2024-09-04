import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";

// Scalar types - ID, String, Boolean, Int, Float

const typeDefs = `
    type Query {
        hello: String!
        userId: ID!
        isAdmin: Boolean!
        age: Int!
        salary: Float!
    }
`;

const resolvers = {
  Query: {
    hello: () => "World!!",
    userId: () => "kjshdf89sdf87s",
    isAdmin: () => true,
    age: () => 23,
    salary: () => 199.99,
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
