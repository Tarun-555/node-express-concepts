const express = require("express");
// const { Server } = require("socket.io"); // socket io  for creating socket
// const {createServer} = require("http");
const { ApolloServer } = require("@apollo/server"); // Apollo server for creating GraphQL server
const { expressMiddleware } = require("@apollo/server/express4");
const { schema } = require("./graphql/schema");
const { resolvers } = require("./graphql/resolvers");
require("dotenv").config();
const { pool } = require("./db"); // database connection

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  introspection: true, // if false schema defination can't be accessed on playground useful for production
});

const PORT = 4000;
const app = express();

// const ioServer = new Server(app); // initializing socket io server with http server

/**
 *  'connection' event listen for connection establishment from client, which provided a callback with socket
 *   which can bes used to emit or listen for events
 */
// ioServer.on('connection', (socket) => {
//     console.log("socket connected", socket.id)
//     socket.emit('hello')
// })

/**
 * if we to use apollo server on same port as express server we need to start then we can use expressMiddleware with apollserver
 * if we want to use different port for graphqql server we can use startStandaloneServer method from @apollo/server/standalone
 * startStandaloneServer( apolloServer,
 * {
 *  listen: {port: 4001}
 * })
 */

apolloServer.start().then(() => {
  app.get("/", (req, res) => res.send("hello"));

  app.use("/graphql", express.json(), expressMiddleware(apolloServer)); //json parser middleware is required to parse body request if not used will get error

  app.listen(PORT, () => {
    pool.connect((err, client, release) => {
      if (err) {
        console.error("Error acquiring client", err.stack);
        return;
      }
      console.log("connected to db");
      //   pool.query(`SELECT * FROM posts`).then((res) => console.log(res.rows));
    });
    console.log(`server started on ${PORT}`);
  });
});

// const server = app.listen(PORT, () => console.log(`server listening on ${PORT}`) );
