import { createServer } from "node:http";
import { createYoga, createSchema, createPubSub } from "graphql-yoga";
import { loadFile } from "graphql-import-files";
import { db } from "./db/model.js";
import resolvers from "./graphql/resolvers/index.js";

const pubsub = createPubSub();

const schema = createSchema({
  typeDefs: loadFile("./src/graphql/schema.graphql"),
  resolvers,
});

const yoga = createYoga({
  schema,
  context: {
    db,
    pubsub,
  },
});

const server = createServer(yoga);

server.listen("4040", () =>
  console.log("GraphQL Server started 🚀 on port : 4040")
);
