import React from "react";
import {
  Image,
  Flex,
  Text,
  useColorMode,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaMoon, FaSun, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { UserQuery } from "../github/types";

export type HeaderProps = {
  title?: string;
  message?: string;
  email?: string;
  linkedin?: string;
  data?: UserQuery;
};

const Header = (props: HeaderProps): React.ReactElement => {
  const { toggleColorMode: toggleMode } = useColorMode();
  const mode = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const iconColor = useColorModeValue("gray.600", "whiteAlpha.800");

  const { title, message, email, linkedin, data } = props;

  const open = (url?: string) => {
    window.open(url);
  };

  return (
    <Flex
      align="center"
      justify="center"
      my={[4, 8, 10, 20]}
      direction={["column", "column", "row", "row"]}
    >
      <IconButton
        position="absolute"
        right={0}
        top={0}
        m={4}
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${mode} mode`}
        variant="ghost"
        color={iconColor}
        onClick={toggleMode}
        icon={<SwitchIcon />}
      />
      <Flex m={4} align="center" justify="center">
        <Flex
          w={280}
          align="center"
          borderWidth={1}
          borderRadius="50%"
          overflow="hidden"
        >
          <Image
            w="100%"
            h="100%"
            objectFit="cover"
            rounded="50%"
            src={data?.user?.avatarUrl}
          />
        </Flex>
      </Flex>
      <Flex direction="column" justifyContent="center" p={4} marginX={4}>
        <Text m={2} fontSize="2xl" fontWeight="semibold">
          {title}
        </Text>
        <Text m={2} fontSize="lg" fontWeight="regular">
          {message}
        </Text>
        <Flex>
          <IconButton
            my={4}
            mr={4}
            fontSize="2xl"
            aria-label={`Open Github`}
            variant="ghost"
            color={iconColor}
            onClick={() => open(data?.user?.url)}
            icon={<FaGithub />}
          />
          <IconButton
            my={4}
            mr={4}
            fontSize="2xl"
            aria-label={`Open LinkedIn`}
            variant="ghost"
            color={iconColor}
            onClick={() => open(linkedin)}
            icon={<FaLinkedinIn />}
          />
          <IconButton
            my={4}
            mr={4}
            fontSize="2xl"
            aria-label={`Send an email`}
            variant="ghost"
            color={iconColor}
            onClick={() => open(`mailto:${email}`)}
            icon={<FiMail />}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
