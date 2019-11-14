import './index.css';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import React from 'react';
import ReactDOM from 'react-dom';
import { LocalizeProvider } from 'react-localize-redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import App from './App';
import { persistor, store } from './redux/store';
import { resolvers, typeDefs } from './resolvers';
import * as serviceWorker from './serviceWorker';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  uri: "http://localhost:3002/graphql",
  typeDefs,
  resolvers
});
cache.writeData({
  data: {}
});

const rootComponent = (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <LocalizeProvider store={store}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </LocalizeProvider>
    </PersistGate>
  </Provider>
);
ReactDOM.render(rootComponent, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
