import { Flex, Heading, Show } from "@chakra-ui/react";
import { useAuth } from "entities/auth";
import { SidebarDrawer } from "widgets/sidebar";

export const Header = () => {
  const { user } = useAuth();

  return (
    <Flex as="header" w="100%" justifyContent="space-between">
      <Show breakpoint="(max-width: 1200px)">
        <SidebarDrawer />
      </Show>
      <Heading as="h1">Привет {user?.firstName} 👋</Heading>
    </Flex>
  );
};
