import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import { User } from "./user";
import cors from "cors";
export async function initServer() {
  const app = express();
  const graphqlServer = new ApolloServer({
    typeDefs: `
      ${User.types}
        type Query {
            ${User.queries}
        }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      //   Mutaion: {},
    },
  });
  await graphqlServer.start();
  app.use(cors());
  app.use(bodyParser.json());
  app.use("/graphql", expressMiddleware(graphqlServer));
  return app;
}
