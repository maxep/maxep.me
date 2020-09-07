import React from "react";
import { Stack } from "@chakra-ui/core";
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
    <Stack isInline shouldWrapChildren spacing={8} align="center">
      {apps}
    </Stack>
  );
};

export default Applications;
