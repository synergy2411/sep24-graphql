import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";

const { hashSync, compareSync } = bcrypt;

const prisma = new PrismaClient();

const typeDefs = /* GraphQL */ `
  type Mutation {
    signUp(data: SignUpInput!): SignUpPayload!
    signIn(data: SignInInput!): SignInPayload!
  }
  type Query {
    hello: String!
  }

  type SignUpPayload {
    id: ID!
    name: String!
    age: Int!
    email: String!
    role: Role!
  }
  type SignInPayload {
    token: String!
  }

  input SignUpInput {
    name: String!
    age: Int!
    email: String!
    password: String!
    role: Role
  }

  input SignInInput {
    email: String!
    password: String!
  }
  enum Role {
    ANALYST
    MANAGER
    ADMIN
  }
`;

const resolvers = {
  Mutation: {
    signUp: async (parent, args, context, info) => {
      try {
        let { name, age, email, role, password } = args.data;
        role = role || "ANALYST";
        let hashedPassword = hashSync(password, 12);
        const createdUser = await prisma.user.create({
          data: {
            name,
            age,
            email,
            role,
            password: hashedPassword,
          },
        });
        return createdUser;
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err);
      }
    },
    signIn: async (parent, args, context, info) => {
      const { email, password } = args.data;
      try {
        const foundUser = await prisma.user.findUnique({ where: { email } });

        if (!foundUser) {
          throw new GraphQLError("Email does not exists - " + email);
        }

        const isMatched = compareSync(password, foundUser.password);

        if (!isMatched) {
          throw new GraphQLError("Incorrect password.");
        }

        return { token: "TOKEN_VALUE" };
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err);
      }
    },
  },
  Query: {
    hello: () => "World!",
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({ schema });

const server = createServer(yoga);

server.listen(4000, () => console.log("Yoga running on PORT : 4000"));
