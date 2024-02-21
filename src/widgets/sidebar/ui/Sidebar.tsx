import { Button, Center, Flex, Heading } from "@chakra-ui/react";
import { ThemeSwitcher } from "../../../shared/ui/ThemeSwitcher";
import { ROUTES } from "../model/meta";
import { Link } from "react-router-dom";
import { Sex, logout, useAuth } from "entities/auth";

interface SidebarProps {
  width?: string | number;
}

const Sidebar = ({ width = 300 }: SidebarProps) => {
  const { user } = useAuth();
  const headingEmoji = user?.sex === Sex.Male ? "👷🏼‍♂️" : "👷🏼‍♀️";
  return (
    <Center
      width={width}
      height="100vh"
      flexDirection="column"
      justifyContent="space-between"
      padding="25px"
    >
      <Center flexDirection="column" gap="10px" w="100%">
        <Heading>{headingEmoji}</Heading>
        <Flex gap="24px" flexDirection="column" width="100%">
          {ROUTES.map((route) => {
            if (!route.role || route.role === user?.role) {
              return (
                <Button
                  borderRadius="20px"
                  key={route.href}
                  as={Link}
                  to={route.href}
                  w="100%"
                >
                  {route.label}
                </Button>
              );
            }
          })}
          <Button
            onClick={() => {
              logout();
            }}
            borderRadius="20px"
            w="100%"
          >
            Выход
          </Button>
        </Flex>
      </Center>
      <Center flexDirection="column" gap="10px" w="100%">
        <ThemeSwitcher width="100%" />
      </Center>
    </Center>
  );
};
export { Sidebar };
