import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { hashSync, compareSync } = bcrypt;

const { sign, verify } = jwt;

const prisma = new PrismaClient();

const typeDefs = /* GraphQL */ `
  type Mutation {
    signUp(data: SignUpInput!): SignUpPayload!
    signIn(data: SignInInput!): SignInPayload!
    createPost(data: CreatePostInput!): PostPayload!
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

  type PostPayload {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
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

  input CreatePostInput {
    title: String!
    body: String!
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

        const token = sign(
          {
            id: foundUser.id,
            role: foundUser.role,
            email: foundUser.email,
            name: foundUser.name,
          },
          "MY_SUPER_SECRET_KEY"
        );

        return { token };
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err);
      }
    },
    createPost: async (parent, args, { token }, info) => {
      if (!token) {
        throw new GraphQLError("Authentication required.");
      }
      const { title, body } = args.data;

      const { id } = verify(token, "MY_SUPER_SECRET_KEY");
      try {
        const createdPost = await prisma.post.create({
          data: {
            title,
            body,
            published: false,
            userId: id,
          },
        });
        return createdPost;
      } catch (err) {
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

const yoga = createYoga({
  schema,
  context: ({ request }) => {
    let token = null;
    const authHeader = request.headers.get("authorization");
    if (authHeader !== null) {
      token = authHeader.split(" ")[1];
    }
    return { token };
  },
});

const server = createServer(yoga);

server.listen(4000, () => console.log("Yoga running on PORT : 4000"));
