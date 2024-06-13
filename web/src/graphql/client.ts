import { ApolloClient, InMemoryCache } from "@apollo/client";

export const graphqlClient = new ApolloClient({
  uri: `${import.meta.env.VITE_STRAPI_URL}/graphql`,
  cache: new InMemoryCache(),
});
