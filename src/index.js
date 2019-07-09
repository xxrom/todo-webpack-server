import { ApolloServer, gql } from 'apollo-server-koa';
import Koa from 'koa';
import morgan from 'koa-morgan';
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

  type Mutation {
    replaceTasks(tasks: [TaskInput!]!): [Task!]!
    addTask(task: TaskInput): TaskReturn!
    deleteTask(id: ID): DeleteId
  }

  input TaskInput {
    name: String
  }

  type Task {
    name: String
  }
  type TaskReturn {
    id: ID
    name: String
  }
  type DeleteId {
    id: String
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
  Mutation: {
    addTask: async (root, args, context) => {
      console.log('data', args);
      const {
        task: { name },
      } = args;
      console.log('addTask ', name);

      const endAdding = await axios
        .post('http://localhost:3000/todo', { name })
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((err) => console.error('Error', err));
      console.log('endAdding', endAdding);
      return endAdding;
    },
    replaceTasks: async (root, args, context) => {
      console.log('root', root);
      console.log('args', args);
      console.log('context', context);
      const tasks = args.tasks;

      if (!tasks) {
        return;
      }

      const endDeleting = await axios
        .get('http://localhost:3000/todo')
        .then((res) => {
          console.log(res.data);
          const tasks = res.data;

          tasks.map(({ id }) => {
            console.log(`delete by id ${id}`);
            axios.delete(`http://localhost:3000/todo/${id}`);
          });
          return 'end deleting';
        })
        .catch((err) => console.error('endDeleting error', err));
      console.log('endDeleting', endDeleting);

      const putTodo = await Promise.all(
        args.tasks.map((task) =>
          axios
            .post('http://localhost:3000/todo', task)
            .then((res) => {
              console.log('new tasks', res.data);
              return res.data;
            })
            .catch((err) => {
              console.error('putTodo error', err);
              return 'error';
            })
        )
      );
      console.log('putTodo', putTodo);

      return tasks;
    },
    deleteTask: async (root, args, context) => {
      // console.log('root', root);
      console.log('args', args);
      // console.log('context', context);
      const { id } = args;

      if (!id) {
        return;
      }

      const endDeleting = await axios
        .delete(`http://localhost:3000/todo/${id}`)
        .then((res) => {
          console.log('deleted res', res);
          return res.data;
        })
        .catch((err) => console.error(err));

      console.log('endDeleting', endDeleting);
      return args;
    },
  },
};

const app = new Koa();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.applyMiddleware({
  app,
});

app.use(morgan('tiny')).listen(PORT, () => {
  console.log(`🚀  Server ready at ${PORT}`);
});
