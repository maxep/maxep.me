import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Application, { ApplicationProps } from "./application";

export type ApplicationsProps = {
  applications: ApplicationProps[];
};

const Applications = ({
  applications,
}: ApplicationsProps): React.ReactElement => {
  const apps = applications.map((app) => (
    <Application application={app} key={app.id} />
  ));

  return (
    <Box>
      <Text m={4} fontSize="2xl" fontWeight="medium">
        Applications
      </Text>
      <Flex mb={8} align="center" justify="center">
        <Flex direction={["column", "column", "column", "row"]}>{apps}</Flex>
      </Flex>
    </Box>
  );
};

export default Applications;
