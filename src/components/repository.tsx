import React from "react";
import {
  Box,
  Flex,
  Link,
  Text,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { GoRepo, GoRepoForked } from "react-icons/go";
import { BsStar } from "react-icons/bs";
import { UserQuery } from "../github/types";
import { DeepExtractTypeSkipArrays } from "../github/helper";

export type RepositoryProps = {
  id: number;
  title: string;
  subtitle: string;
  comment: string;
  beta: boolean;
  url?: string;
  icon?: string;
  rating?: Rating;
};

type Rating = {
  value: number;
  count: number;
};

type State = DeepExtractTypeSkipArrays<
  UserQuery,
  ["user", "pinnedItems", "edges", "node"]
> | null;

type Props = {
  repository?: State;
};

const Repository = (props: Props): React.ReactElement => {
  const { repository } = props;
  const iconColor = useColorModeValue("gray.600", "whiteAlpha.800");

  if (!repository) return <React.Fragment />;

  const Title = ({ repository }: Props): React.ReactElement => {
    if (!repository?.isInOrganization)
      return <Text fontWeight="semibold">{repository?.name}</Text>;
    return (
      <>
        <Text as="span" fontWeight="regular">
          {repository?.owner?.login}
        </Text>
        /
        <Text as="span" fontWeight="semibold">
          {repository?.name}
        </Text>
      </>
    );
  };

  const Language = ({ repository }: Props): React.ReactElement => {
    if (!repository?.languages.nodes.length) return <React.Fragment />;
    const language = repository.languages.nodes[0];
    return (
      <Flex align="center">
        <Box marginX={1} w={3} h={3} borderRadius="50%" bg={language.color} />
        <Text fontSize="sm" variant="description">
          {language.name}
        </Text>
      </Flex>
    );
  };

  const Stars = ({ repository }: Props): React.ReactElement => {
    if (!repository?.stargazerCount) return <React.Fragment />;
    const count = repository.stargazerCount.toLocaleString(undefined, {
      notation: "compact",
    });

    return (
      <Flex ml={6} align="center">
        <Icon as={BsStar} color={iconColor} />
        <Text ml={1} fontSize="sm" variant="description">
          {count}
        </Text>
      </Flex>
    );
  };

  const Forks = ({ repository }: Props): React.ReactElement => {
    if (!repository?.forkCount) return <React.Fragment />;
    const count = repository.forkCount.toLocaleString(undefined, {
      notation: "compact",
    });

    return (
      <Flex ml={6} align="center">
        <Icon as={GoRepoForked} color={iconColor} />
        <Text ml={1} fontSize="sm" variant="description">
          {count}
        </Text>
      </Flex>
    );
  };

  return (
    <Flex direction="column" p={4} marginX={4} rounded="lg" borderWidth={1}>
      <Flex align="center">
        <Icon mr={2} as={GoRepo} color={iconColor} />
        <Link fontSize="sn" href={repository.url} isExternal>
          <Title repository={repository} />
        </Link>
      </Flex>
      <Box>
        <Text
          marginY={2}
          fontSize="sm"
          fontWeight="regular"
          variant="description"
        >
          {repository.description}
        </Text>
      </Box>
      <Flex mt={2}>
        <Language repository={repository} />
        <Stars repository={repository} />
        <Forks repository={repository} />
      </Flex>
    </Flex>
  );
};

export default Repository;
