# Break Timing

- Tea Break : 12:00 (15 mins)
- Lunch Break : 01:30 (45 mins)
- Tea Break : 04:00 (15 mins)

# NodeJS Installer

- Node Runtime Environment
- Node Package Manager (NPM)
- Node Native Modules (eg. http, os, events, utils, fs etc)

# JavaScript

- Client Side (Browser environment)
- Server Side (Node Runtime environment)

# REST ENDPOINTS

- Server centric approach
- Multiple REST Endpoints

/books (id, isbn, title, author, numOfPages,. ...)
/authors (authorId, name, email, age, dob, ...)

id, title, author

# GraphQL API

- Client centric approach
- Declarative data fetching
- Single Endpoint
- No over-fetching : fetching more data than required
- No under-fetching : fetching less data than required

query {
books {
id title isbn
author {
name, email
}
}
}

# Client Server Architecture

GraphQL Server -

- Java : GraphQL-starter
- .Net
- NodeJs : GraphQL-Yoga, Apollo Server
- Python

GraphQL Client -

- Apollo Client

- fetch API

# Steps for creating GraphQL Server

- Generate package.json file
  > npm init -y
- Install GraphQL dependencies
  > npm install graphql-yoga graphql
  > npm install nodemon -D
- Create Yoga server
- Run the application
  > npm run dev:start

---

- Mutations -> Update, Delete
- Subscription
- Code refactoring
- MongoDB
- ORM - Prisma
- JWT Authentication
