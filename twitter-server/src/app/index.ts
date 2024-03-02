import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
export async function initServer() {
  const app = express();
  const graphqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            sayHello:String
        }
    `,
    resolvers: {
      Query: {
        sayHello: () => `Hello from graphql server `,
      },
      //   Mutaion: {},
    },
  });
  await graphqlServer.start();
  app.use(bodyParser.json());
  app.use("/graphql", expressMiddleware(graphqlServer));
  return app;
}
