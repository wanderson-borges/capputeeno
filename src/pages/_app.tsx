import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import GlobalStyle, { GlobalContainer } from "@/styles/GlobalStyles";
import { CartProvider } from "@/contexts/CartContext";
import { Header } from "@/components/Header/Header";
import { useState } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <CartProvider>
        <ApolloProvider client={client}>
          <GlobalStyle />
          <GlobalContainer>
            <Header
              onSearchChange={(e) => setSearchTerm(e.target.value)}
              searchTerm={searchTerm}
            />
            <Component {...pageProps} />
          </GlobalContainer>
        </ApolloProvider>
      </CartProvider>
    </>
  );
}
