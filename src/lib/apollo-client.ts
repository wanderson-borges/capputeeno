import { ApolloClient, InMemoryCache } from "@apollo/client";

// Criando a instância do Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:3333", // URL da API GraphQL
  cache: new InMemoryCache(), // Cache para armazenar as respostas da API
});

export default client;
