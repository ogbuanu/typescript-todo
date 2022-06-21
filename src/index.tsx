import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, {client} from './App';
import { ChakraProvider } from '@chakra-ui/react'
import {
  // ApolloClient,
  // InMemoryCache,
  ApolloProvider,
  // useQuery,
  // gql
} from "@apollo/client";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
  <ChakraProvider>
    <App />
    </ChakraProvider>
  </ApolloProvider>
);


