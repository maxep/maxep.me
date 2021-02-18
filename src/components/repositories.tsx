import React from "react";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import Repository from "./repository";
import { UserQuery } from "../github/types";

export type RepositoriesProps = {
  data?: UserQuery;
};

const Repositories = ({ data }: RepositoriesProps): React.ReactElement => {
  const repositories = data?.user?.pinnedItems.edges?.map((repo, index) => (
    <Repository repository={repo?.node} key={index} />
  ));

  return (
    <Box>
      <Text m={4} fontSize="2xl" fontWeight="medium">
        Repositories
      </Text>
      <Flex mb={8} align="center" justify="center">
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={4}>
          {repositories}
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default Repositories;
