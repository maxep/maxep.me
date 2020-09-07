import React, { useMemo } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
} from "@apollo/client";

type Props = {
  children?: React.ReactNode;
};

const GithubClient = () => {
  const link = ApolloLink.from([
    (operation, forward) => {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_PAT}`,
        },
      });
      return forward(operation);
    },
    createHttpLink({ uri: "https://api.github.com/graphql" }),
  ]);

  return new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });
};

export function GithubProvider({ children }: Props): React.ReactElement {
  const client = useMemo(GithubClient, []);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
