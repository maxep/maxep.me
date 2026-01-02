import React, { useState, useEffect } from "react";
import { Box, Image, Flex, Link, Text, Icon } from "@chakra-ui/react";
import fetchJsonp from "fetch-jsonp";
import Rating from "./rating";
import { BsStarFill } from "react-icons/bs";

export type ApplicationProps = {
  id: number;
  title: string;
  subtitle: string;
  comment: string;
  beta: boolean;
  url?: string;
  icon?: string;
  rating?: {
    value: number;
    count: number;
  };
};

type Props = {
  application: ApplicationProps;
};

const useApplication = (props: ApplicationProps): ApplicationProps => {
  const [application, setApplication] = useState(props);

  useEffect(() => {
    fetchJsonp(`https://itunes.apple.com/lookup?id=${props.id}`)
      .then((data) => data.json())
      .then((json) => {
        if (json.resultCount !== 1) return;
        const result = json.results[0];

        setApplication((current) => ({
          ...current,
          icon: result.artworkUrl512,
          url: result.sellerUrl,
          rating: {
            value: result.averageUserRating,
            count: result.userRatingCount,
          },
        }));
      });
  }, [props.id]);

  return application;
};

const Application = (props: Props): React.ReactElement => {
  const application = useApplication(props.application);

  const rating = application.rating?.value.toLocaleString(undefined, {
    maximumFractionDigits: 1,
  });

  const ratingCount = application.rating?.count.toLocaleString(undefined, {
    notation: "compact",
  });

  return (
    <Box p={4} marginX={4} marginBottom={4} w="xs" rounded="lg" borderWidth={1}>
      <Flex mb={4} align="center" justify="center" direction="column">
        <Image
          w={160}
          alignItems="center"
          src={application.icon}
          rounded={"22.5%"}
        />
        <Flex marginY={2} direction="column" align="center">
          <Rating
            initialRating={application.rating?.value}
            readonly
            emptySymbol={<Icon as={BsStarFill} color="#CBD5E0" />}
            fullSymbol={<Icon as={BsStarFill} color="#FF9000" />}
            placeholderSymbol={<BsStarFill color="#CBD5E0" />}
          />
          <Text fontSize="sm" fontWeight="regular" color="gray.500">
            {application.beta ? "In Beta" : `${rating}, ${ratingCount} Ratings`}
          </Text>
        </Flex>
      </Flex>
      <Link
        fontSize="lg"
        fontWeight="medium"
        variant="app"
        href={application.url}
        isExternal
      >
        {application.title}
      </Link>
      <Text fontSize="md" fontWeight="regular" variant="description">
        {application.subtitle}
      </Text>
      <Text mt={4} fontSize="sm" fontWeight="regular" variant="description">
        {application.comment}
      </Text>
    </Box>
  );
};

export default Application;
