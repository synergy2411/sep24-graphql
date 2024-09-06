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
- Subscription -> Realtime updates
- Code refactoring -> folder structure
- MongoDB -> Mongo Atlas
- ORM - Prisma
- JWT Authentication

> npm install graphql-import-files -D

---

Mongo Atlas
username : testuser
password : nalHpYdr7t9Sq0VW

mongodb+srv://testuser:nalHpYdr7t9Sq0VW@cluster0.e9xsq.mongodb.net/

mongodb+srv://testuser:nalHpYdr7t9Sq0VW@cluster0.e9xsq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

mongodb+srv://testuser:nalHpYdr7t9Sq0VW@cluster0.e9xsq.mongodb.net/optum-db

---

# graphql-prisma-mongo

> npm init -y
> npm install prisma --save-dev
> npx prisma init

- configure DatabaseUrl in .env file
- configure Datasource in schema.prisma file
- create model/collection

  > npx prisma db push
  > npm install @prisma/client

---

- Frontend : Vanilla JavaScript, React App
- Testing : Jest

---

> npm create vite@latest
> cd frontend-javascript
> npm install
> npm run dev
> npm install @apollo/client graphql react
