import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const { hashSync, compareSync } = bcrypt;

const prisma = new PrismaClient();

const typeDefs = /* GraphQL*/ `
    type Mutation {
        signUp(data : SignUpInput) : SignUpPayload!
    }
    type Query {
        hello : String!
    }

    type SignUpPayload {
        id: ID!
        name: String!
        age: Int!
        email: String!
        role: Role!
    }

    input SignUpInput{
        name: String!
        age: Int!
        email: String!
        password: String!
        role: Role
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
