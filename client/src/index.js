import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { HashRouter } from 'react-router-dom';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import Mutations from "./graphql/mutations";

import express from 'express';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { schema } from '../../server/schema/schema';

const { VERIFY_USER } = Mutations;

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

/// New stuff

// const PORT = 5000;
// const server = express();

// server.use('*', cors({ origin: `http://localhost:${PORT}` }));

// server.use('/graphql', bodyParser.json(), graphqlExpress({
//   schema
// }));

// server.use('/graphiql', graphiqlExpress({
//   endpointURL: '/graphql',
//   subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
// }));

// // Wrap the Express server
// const ws = createServer(server);
// ws.listen(PORT, () => {
//   console.log(`Apollo Server is now running on http://localhost:${PORT}`);
//   // Set up the WebSocket for handling GraphQL subscriptions
//   new SubscriptionServer({
//     execute,
//     subscribe,
//     schema
//   }, {
//       server: ws,
//       path: '/subscriptions',
//     });
// });

////

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
  headers: {
    authorization: localStorage.getItem('auth-token')
  }
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/subscriptions`,
  options: {
    reconnect: true,
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

cache.writeData({
  data: {
    isLoggedIn: Boolean(localStorage.getItem("auth-token"))
  }
});

const token = localStorage.getItem("auth-token");
if (token) {
  client
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn
        }
      });
    });
}

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter >
        <App />
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));