import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import GlobalStyle from "@/styles/global";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <>
        <GlobalStyle />
        <Component {...pageProps} />
      </>
    </ApolloProvider>
  );
}
