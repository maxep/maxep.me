import React, { useState, useEffect } from "react";
import { Box, Image, Flex, Link, Text } from "@chakra-ui/core";
import fetchJsonp from "fetch-jsonp";

export type ApplicationProps = {
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

  return (
    <Box width={220} rounded="md" borderWidth={1} borderColor="grey">
      <Flex align="center" justify="center" direction="column">
        <Image
          alignItems="center"
          src={application.icon}
          size={130}
          rounded={"22.5%"}
        />
        <Flex mt={2} align="center">
          <Text>
            <b>{application.rating?.value}</b> ({application.rating?.count})
          </Text>
        </Flex>
      </Flex>
      <Link href={application.url} isExternal>
        {application.title}
      </Link>
      <Text>{application.subtitle}</Text>
      <Text>{application.comment}</Text>
    </Box>
  );
};

export default Application;
