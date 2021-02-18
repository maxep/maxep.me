import React from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { useUserQuery } from "./github/types";
import Container from "./components/container";
import Header from "./components/header";
import Applications, { ApplicationsProps } from "./components/applications";
import Repositories from "./components/repositories";
import theme from "./theme";
import config from "./config.json";

type Config = {
  username: string;
  description: {
    title: string;
    message: string;
    email: string;
    linkedin: string;
  };
} & ApplicationsProps;

const App = (): React.ReactElement => {
  const { username, applications } = config as Config;

  const { data } = useUserQuery({
    variables: { user: username },
  });

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Container>
        <Header data={data} {...config.description} />
        <Applications applications={applications} />
        <Repositories data={data} />
      </Container>
    </ChakraProvider>
  );
};

export default App;
