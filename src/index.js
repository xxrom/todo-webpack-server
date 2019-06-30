// import express from 'express';
// import expressGraphQL from 'express-graphql';
// import { buildSchema } from 'graphql';

import { ApolloServer, gql } from 'apollo-server';

import env from 'dotenv';
import axios from 'axios';

env.config();
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  type TodoItem {
    name: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]

    hello: String

    todo: [TodoItem]
  }
`;
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];
const PORT = process.env.PORT || 4000;
const resolvers = {
  Query: {
    books: () => books,
    hello: () => 'hello',
    todo: () =>
      axios
        .get('http://localhost:3000/todo')
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
          return 'error';
        }),
  },
};
const server = new ApolloServer({ typeDefs, resolvers });
server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// The root provides a resolver function for each API endpoint
// const root = {
//   hello: () => {
//     return 'Hello';
//   },
// axios
//   .get('http://localhost:3000/todo')
//   .then((res) => res.data)
//   .catch((err) => {
//     console.error(err);
//     return 'error';
//   }),
// };

// const app = express();
// app.use(
//   '/graphql',
//   expressGraphQL({
//     schema: schema,
//     rootValue: root,
//     graphql: true,
//   }),
// );
// app.listen(PORT);
// console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
