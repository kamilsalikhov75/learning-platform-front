import { Flex, Show } from "@chakra-ui/react";
import { getMe } from "entities/auth";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "widgets/header";
import { Sidebar } from "widgets/sidebar";

const DashboardLayout = () => {
  useEffect(() => {
    getMe();
  }, []);

  return (
    <Flex width="100%">
      <Show breakpoint="(min-width: 1200px)">
        <Sidebar />
      </Show>
      <Flex
        padding="25px"
        maxW="1400px"
        w={{ base: "100%", xl: "calc(100% - 300px)" }}
        flexDirection="column"
        overflowY="auto"
        height="100vh"
        gap="20px"
      >
        <Header />
        <Outlet />
      </Flex>
    </Flex>
  );
};

export { DashboardLayout };
