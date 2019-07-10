import { ApolloServer, gql } from 'apollo-server-koa';
import Koa from 'koa';
import morgan from 'koa-morgan';
import env from 'dotenv';
import axios from 'axios';

env.config();
const PORT = process.env.PORT || 4000;

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  type Query {
    getTasks: [Task]
  }

  type Mutation {
    addTask(task: TaskInput): TaskReturn!
    deleteTask(id: ID): DeleteId
  }

  input TaskInput {
    name: String
  }

  type Task {
    id: String
    name: String
  }

  type TaskReturn {
    id: String
    name: String
  }
  type DeleteId {
    id: String
  }
`;

const resolvers = {
  Query: {
    getTasks: () =>
      axios
        .get('http://localhost:3000/tasks')
        .then((res) => {
          console.log('getTasks', res.data);
          return res.data;
        })
        .catch((err) => {
          console.error(err);
          return err;
        }),
  },
  Mutation: {
    addTask: async (_root, args, _context) => {
      console.log('addTask', args);
      const {
        task: { name },
      } = args;

      const endAdding = await axios
        .post('http://localhost:3000/tasks', { name })
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((err) => {
          console.error('Error', err);
          return err;
        });
      return endAdding;
    },
    deleteTask: async (_root, args, _context) => {
      console.log('deleteTask', args);
      const { id } = args;
      if (!id) {
        return;
      }
      const ansWithErrorOrNot = await axios
        .delete(`http://localhost:3000/tasks/${555}`)
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
          return err;
        });

      return Object.keys(ansWithErrorOrNot).length === 0
        ? args
        : ansWithErrorOrNot;
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
