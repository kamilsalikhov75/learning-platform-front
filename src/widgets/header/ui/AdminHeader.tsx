import { Button, Flex, Heading } from "@chakra-ui/react";
import { ROUTES } from "../model/meta";
import { Link } from "react-router-dom";

export const AdminHeader = () => {
  return (
    <Flex as="header" w="100%" gap="20px">
      <Heading as="h2" size="lg">
        Администрирование
      </Heading>
      <Flex gap="4px">
        {ROUTES.map((route) => {
          return (
            <Button key={route.href} to={route.href} as={Link}>
              {route.label}
            </Button>
          );
        })}
      </Flex>
    </Flex>
  );
};
