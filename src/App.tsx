import React from 'react';
import { ThemeProvider, CSSReset, Box } from "@chakra-ui/core";
import Applications, { ApplicationsProps } from "./components/applications";
import config from "./config.json"

type Config = {
  title: string;
} & ApplicationsProps;

const App = (): React.ReactElement => {

  const { applications } = config as Config;

  return (
    <ThemeProvider>
      <CSSReset />
      <Box>
        <Applications applications={applications} />
      </Box>
    </ThemeProvider>
  );
};

export default App;
