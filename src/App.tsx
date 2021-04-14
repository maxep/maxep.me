import React from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { useUserQuery } from "./github/types";
import Container from "./components/container";
import Header from "./components/header";
import Applications, { ApplicationsProps } from "./components/applications";
import Repositories from "./components/repositories";
import theme from "./theme";
import config from "./config.json";

type Config = {
  name: string;
  username: string;
  description: {
    title: string;
    message: string;
    email: string;
    linkedin: string;
  };
} & ApplicationsProps;

const App = (): React.ReactElement => {
  const { name, username, description, applications } = config as Config;

  const { data } = useUserQuery({
    variables: { user: username },
  });

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Helmet>
        <title>{name}</title>
        <meta name={name} content={description.title} />
        <meta name="description" content={description.message} />
        <meta property="og:title" content={description.title} />
        <meta property="og:description" content={description.message} />
        <meta property="og:image" content={data?.user?.avatarUrl} />
        <link rel="apple-touch-icon" href={data?.user?.avatarUrl} />
      </Helmet>
      <Container>
        <Header data={data} {...description} />
        <Applications applications={applications} />
        <Repositories data={data} />
      </Container>
    </ChakraProvider>
  );
};

export default App;
