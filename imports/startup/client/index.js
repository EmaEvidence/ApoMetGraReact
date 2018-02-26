import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, from } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from '../../ui/App';

const httpLink = new HttpLink({
  uri: Meteor.absoluteUrl('graphql'),
});

const authLink = new ApolloLink((operation, forward) => {
  const token = Accounts._storedLoginToken();
  operation.setContext(() => ({
    headers: {
      'meteor-login-token': token,
    }
  }));
  return forward(operation);
});

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: from([authLink,httpLink]),
  cache,
}); 

const ApolloApp = () => {
  return (
    <ApolloProvider client={client} >
      <App />
    </ApolloProvider>
  );
};

Meteor.startup(() => {
  render(<ApolloApp />, document.getElementById("app"));
});
